#!/bin/bash

PHONE=$1
STAGE=$2

if [ -z "$PHONE" ]; then
  echo "Target phone expected. None found."
  exit 1
fi

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

UUID=$(uuidgen)

QUEUE_URL=$(aws sqs create-queue \
  --queue-name sms-queue-sqs-$STAGE.fifo \
  --attributes "FifoQueue=true,ContentBasedDeduplication=true" \
  --query "QueueUrl" \
  --profile gmavillage)

# remove quotes
QUEUE_URL=$(sed -e 's/^"//' -e 's/"$//' <<< $QUEUE_URL)

aws sqs send-message \
  --queue-url $QUEUE_URL \
  --message-body "Test Message $UUID" \
  --message-attributes "phone={DataType=String,StringValue=$PHONE}" \
  --message-deduplication-id $UUID \
  --message-group-id "sms" \
  --profile gmavillage