#!/bin/bash

STAGE=$1

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

echo "Creating Deadletter Queue"

DEAD_LETTER_URL=$(aws sqs create-queue \
  --queue-name sms-queue-sqs-deadletter-$STAGE.fifo \
  --attributes "FifoQueue=true" \
  --query "QueueUrl" \
  --profile gmavillage)

# remove quotes
DEAD_LETTER_URL=$(sed -e 's/^"//' -e 's/"$//' <<< $DEAD_LETTER_URL)

echo "Dead Letter Queue Url: $DEAD_LETTER_URL"

DEAD_LETTER_ARN=$(aws sqs get-queue-attributes \
  --queue-url $DEAD_LETTER_URL \
  --attribute-names QueueArn \
  --query "Attributes.QueueArn" \
  --profile gmavillage)

DEAD_LETTER_ARN=$(sed -e 's/^"//' -e 's/"$//' <<< $DEAD_LETTER_ARN)

echo "Dead Letter Queue Arn: $DEAD_LETTER_ARN"

echo "Creating Main SMS Queue"
aws sqs create-queue \
  --queue-name sms-queue-sqs-$STAGE.fifo \
  --attributes "FifoQueue=true,ContentBasedDeduplication=true,RedrivePolicy='{\"deadLetterTargetArn\":\"$DEAD_LETTER_ARN\",\"maxReceiveCount\":\"3\"}'" \
  --profile gmavillage