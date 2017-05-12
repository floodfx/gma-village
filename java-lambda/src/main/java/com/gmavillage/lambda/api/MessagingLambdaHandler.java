package com.gmavillage.lambda.api;

import static com.google.common.base.MoreObjects.firstNonNull;
import static java.lang.System.getenv;

import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.amazonaws.services.sqs.model.Message;
import com.gmavillage.lambda.AbstractLambdaProxyHandler;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.model.CareNeed;
import com.gmavillage.model.CareNeed.DeliveryStatusType;
import com.gmavillage.model.json.GsonFactory;
import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.google.gson.Gson;


public class MessagingLambdaHandler extends AbstractLambdaProxyHandler {

  private static final String STAGE = firstNonNull(getenv("STAGE"), "dev");

  private final SQSHelper sqsHelper;
  private final UserDB userDB;
  private final Gson gson = GsonFactory.getGson();

  public MessagingLambdaHandler() {
    this(new SQSHelper(), new UserDB());
  }

  public MessagingLambdaHandler(final SQSHelper sqsHelper, final UserDB userDB) {
    this.sqsHelper = sqsHelper;
    this.userDB = userDB;
  }

  @Override
  protected LambdaProxyOutput processEvent(final LambdaProxyEvent event, final Context context)
      throws Exception {

    final List<Message> messages = sqsHelper.getMessages();
    final List<String> sids = Lists.newArrayList();

    for (final Message message : messages) {
      sqsHelper.printMessageDetails(message);

      final CareNeed careNeed = gson.fromJson(message.getBody(), CareNeed.class);

      final String phone = message.getMessageAttributes().get("phone").getStringValue();
      final String messageText = CareNeedMessageFormatter.toMessageFormat(careNeed);
      final String sid = TwilioSMS.sendSms(phone, messageText);
      careNeed.setDeliveryStatus(DeliveryStatusType.DELIVERED);
      userDB.updateCareNeedStatus(careNeed);
      sids.add(sid);

      sqsHelper.deleteMessage(message);
    }

    // consider returning number of messages processed
    return new LambdaProxyOutput(200, null, Joiner.on(",").join(sids));
  }



}
