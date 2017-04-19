#!/bin/bash -e

PROFILE=gmavillage
ACCOUNT_ID=984688804723
REST_API_ID=$1
LAMBDA_NAME=$2
STAGE=$3

if [ -z "$REST_API_ID" ]; then
  echo "Rest API ID expected. None found."
  exit 1
fi

if [ -z "$LAMBDA_NAME" ]; then
  echo "LAMBDA Name expected. None found."
  exit 1
fi

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

FUNCTION_NAME="$LAMBDA_NAME-$STAGE"

aws lambda add-permission \
  --qualifier $STAGE \
  --function-name $FUNCTION_NAME \
  --statement-id apigateway-lambda-execute-star-$REST_API_ID \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-west-2:$ACCOUNT_ID:$REST_API_ID/*" \
  --profile $PROFILE
