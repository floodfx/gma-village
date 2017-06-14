package com.gmavillage.lambda.api;

import static com.google.common.base.MoreObjects.firstNonNull;
import static java.lang.System.getenv;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class TwilioSMS {

  private static final String STAGE = firstNonNull(getenv("STAGE"), "dev");
  private static final String TWILIO_ACCOUNT_SID = firstNonNull(getenv("TWILIO_ACCOUNT_SID"), "");
  private static final String TWILIO_AUTH_TOKEN = firstNonNull(getenv("TWILIO_AUTH_TOKEN"), "");
  private static final PhoneNumber GMA_VILLAGE_PHONE = new PhoneNumber("+15109014627");

  static {
    Twilio.init(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  }


  public static String sendSms(String phone, final String messageText) {
    if (!STAGE.equals("prod")) {
      phone = "+14157027236";
    }

    final Message message =
        Message.creator(new PhoneNumber("+" + phone), GMA_VILLAGE_PHONE, messageText).create();

    System.out.println(message.getSid());
    return message.getSid();
  }

}
