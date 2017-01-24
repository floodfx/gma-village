#!/bin/bash

ZIP_FILE=$1
SQS_QUEUE_URL=$2
STAGE=$3

if [ -z "$ZIP_FILE" ]; then
  echo "Zip file expected. None found."
  exit 1
fi

if [ -z "$SQS_QUEUE_URL" ]; then
  echo "SQS Queue URL expected. None found."
  exit 1
fi

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

FUNC_NAME=gma-village-sms-queue-$STAGE

aws lambda update-function-configuration \
  --function $FUNC_NAME \
  --environment "Variables={SQS_QUEUE_URL=$SQS_QUEUE_URL}" \
  --profile gmavillage

aws lambda update-function-code \
  --function-name $FUNC_NAME \
  --zip-file fileb://$ZIP_FILE \
  --profile gmavillage