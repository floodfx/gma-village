#!/bin/bash

ZIP_FILE=$1
STAGE=$2

if [ -z "$ZIP_FILE" ]; then
  echo "Zip file expected. None found."
  exit 1
fi

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

aws lambda create-function \
  --function-name gma-village-sms-queue-$STAGE \
  --description "[$STAGE] Function that processes an SQS Queue full of SMS Message to be sent." \
  --zip-file fileb://$ZIP_FILE \
  --runtime nodejs4.3 \
  --role arn:aws:iam::984688804723:role/sms-queue-lambda-basic-execution \
  --handler index.handle \
  --timeout 10 \
  --profile gmavillage