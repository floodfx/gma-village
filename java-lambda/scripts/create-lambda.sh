#!/bin/bash -e

PROFILE=gmavillage
ACCOUNT_ID=984688804723
LAMBDA_NAME=$1
ZIP_FILE=$2
STAGE=$3


if [ -z "$LAMBDA_NAME" ]; then
  echo "Lambda name expected. None found."
  exit 1
fi

if [ -z "$ZIP_FILE" ]; then
  echo "Zip file expected. None found."
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
  --runtime nodejs6.10 \
  --role $ROLE_ARN \
  --handler index.handle \
  --timeout 10 \
  --query "Version" \
  --publish \
  --profile $PROFILE
