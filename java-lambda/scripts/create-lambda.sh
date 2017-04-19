#!/bin/bash -e

PROFILE=gmavillage
ACCOUNT_ID=984688804723
LAMBDA_NAME=$1
ZIP_FILE=$2
HANDLER=$3
STAGE=$4


if [ -z "$LAMBDA_NAME" ]; then
  echo "Lambda name expected. None found."
  exit 1
fi

if [ -z "$ZIP_FILE" ]; then
  echo "Zip file expected. None found."
  exit 1
fi

if [ -z "$HANDLER" ]; then
  echo "HANDLER expected. None found."
  exit 1
fi

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

ROLE_ARN=arn:aws:iam::$ACCOUNT_ID:role/lambda-execution-$STAGE

aws lambda create-function \
  --function-name $LAMBDA_NAME-$STAGE \
  --description "[$STAGE] $LAMBDA_NAME." \
  --zip-file fileb://$ZIP_FILE \
  --runtime java8 \
  --role $ROLE_ARN \
  --handler $HANDLER \
  --timeout 10 \
  --query "Version" \
  --publish \
  --profile $PROFILE
