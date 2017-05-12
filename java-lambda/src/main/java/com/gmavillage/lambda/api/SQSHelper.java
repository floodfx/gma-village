package com.gmavillage.lambda.api;

import static com.google.common.base.MoreObjects.firstNonNull;
import static java.lang.System.getenv;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClient;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.DeleteMessageRequest;
import com.amazonaws.services.sqs.model.Message;
import com.amazonaws.services.sqs.model.MessageAttributeValue;
import com.amazonaws.services.sqs.model.ReceiveMessageRequest;
import com.amazonaws.services.sqs.model.SendMessageRequest;
import com.amazonaws.services.sqs.model.SendMessageResult;
import com.gmavillage.model.json.GsonFactory;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.gson.Gson;

public class SQSHelper {

  private static final String STAGE = firstNonNull(getenv("STAGE"), "dev");
  private static final String SQS_QUEUE_URL =
      "https://us-west-2.queue.amazonaws.com/984688804723/sms-queue-sqs-" + STAGE + ".fifo";
  private static final String DEADLETTER_SQS_QUEUE_URL =
      "https://us-west-2.queue.amazonaws.com/984688804723/sms-queue-deadletter-" + STAGE + ".fifo";

  private final AmazonSQS sqs;
  private final Gson gson = GsonFactory.getGson();

  public SQSHelper() {
    this(AmazonSQSClientBuilder.defaultClient());
  }

  public SQSHelper(final AmazonSQS sqs) {
    this.sqs = sqs;
  }

  public void sendSqsMessage(final String phone, final String messageText) {
    // Send a message
    System.out.println("Sending a message to " + SQS_QUEUE_URL + ".\n");
    final SendMessageRequest sendMessageRequest =
        new SendMessageRequest(SQS_QUEUE_URL, messageText);
    sendMessageRequest.setMessageGroupId("sms");
    sendMessageRequest.setMessageDeduplicationId(UUID.randomUUID().toString());
    final Map<String, MessageAttributeValue> attributes = Maps.newHashMap();
    attributes.put("phone",
        new MessageAttributeValue().withDataType("String").withStringValue(phone));
    sendMessageRequest.setMessageAttributes(attributes);

    final SendMessageResult sendMessageResult = sqs.sendMessage(sendMessageRequest);
    final String sequenceNumber = sendMessageResult.getSequenceNumber();
    final String messageId = sendMessageResult.getMessageId();
    System.out.println("SendMessage succeed with messageId " + messageId + ", sequence number "
        + sequenceNumber + "\n");
  }

  public List<Message> getMessages(final int numMessages, final String queueUrl) {
    final ReceiveMessageRequest receiveMessageRequest = new ReceiveMessageRequest(queueUrl);
    receiveMessageRequest.setMaxNumberOfMessages(numMessages);
    receiveMessageRequest.setMessageAttributeNames(Lists.newArrayList("All"));
    receiveMessageRequest.setVisibilityTimeout(45);
    return sqs.receiveMessage(receiveMessageRequest).getMessages();
  }

  public List<Message> getMessages() {
    return getMessages(10, SQS_QUEUE_URL);
  }

  public void deleteMessage(final Message message) {
    final String messageReceiptHandle = message.getReceiptHandle();
    sqs.deleteMessage(new DeleteMessageRequest().withQueueUrl(SQS_QUEUE_URL)
        .withReceiptHandle(messageReceiptHandle));
  }

  public void printMessageDetails(final Message message) {
    System.out.println("  Message");
    System.out.println("    MessageId:     " + message.getMessageId());
    System.out.println("    ReceiptHandle: " + message.getReceiptHandle());
    System.out.println("    MD5OfBody:     " + message.getMD5OfBody());
    System.out.println("    Body:          " + message.getBody());
    for (final Entry<String, String> entry : message.getAttributes().entrySet()) {
      System.out.println("  Attribute");
      System.out.println("    Name:  " + entry.getKey());
      System.out.println("    Value: " + entry.getValue());
    }
  }

  public static void main(final String[] args) {
    final SQSHelper helper =
        new SQSHelper(new AmazonSQSClient(new ProfileCredentialsProvider("gmavillage")));
    final List<Message> messages = helper.getMessages(10, DEADLETTER_SQS_QUEUE_URL);
    System.out.println("Messages received:" + messages);
    final Gson gson = GsonFactory.getGson();
    for (final Message m : messages) {
      gson.toJson(m);
      final String phone = m.getMessageAttributes().get("phone").getStringValue();
      System.out.println("phone:" + phone);
    }
  }

}
