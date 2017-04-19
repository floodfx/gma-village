#!/bin/bash -e

PROFILE=gmavillage
ACCOUNT_ID=984688804723
LAMBDA_NAME=$1
DESCRIPTION=$2
GATEWAY_PATH=$3
VERSION=$4
SWAGGER_TEMPLATE_FILE=$5
STAGE=$6

if [ -z "$LAMBDA_NAME" ]; then
  echo "Lambda name expected. None found."
  exit 1
fi

if [ -z "$DESCRIPTION" ]; then
  echo "Description expected. None found."
  exit 1
fi

if [ -z "$GATEWAY_PATH" ]; then
  echo "Path expected. None found."
  exit 1
fi

if [ -z "$VERSION" ]; then
  echo "Version expected. None found."
  exit 1
fi

if [ -z "$SWAGGER_TEMPLATE_FILE" ]; then
  echo "Swagger file expected. None found."
  exit 1
fi

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

FUNCTION_NAME=$LAMBDA_NAME-$STAGE

TMP=`mktemp`
# replace LAMBDA_NAME in SWAGGER_TEMPLATE
sed "s/ACCOUNT_ID/${ACCOUNT_ID}/g;s/VERSION/${VERSION}/g;s/PATH/${GATEWAY_PATH}/g;s/LAMBDA_NAME/${FUNCTION_NAME}/g;s/LAMBDA_NAME/${FUNCTION_NAME}/g;s/STAGE/${STAGE}/g;" $SWAGGER_TEMPLATE_FILE > $TMP


aws apigateway import-rest-api \
  --body "file://$TMP" \
  --fail-on-warnings \
  --query 'id' \
  --profile $PROFILE
