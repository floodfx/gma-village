#!/bin/bash

STAGE=$1

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

aws sqs create-queue \
  --queue-name sms-queue-sqs-$STAGE.fifo \
  --attributes "FifoQueue=true,ContentBasedDeduplication=true" \
  --profile gmavillage