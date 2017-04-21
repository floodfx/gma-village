#!/bin/bash

PROFILE=gmavillage
LAMBDA_NAME="accountkit"
HANDLER="com.gmavillage.lambda.accountkit.LambdaHandler::handleRequest"
AK_APP_ID=1864284563828976
AK_APP_VERSION=v1.1
CSRF=C5C6DDF7-E4CC-4F87-A566-EE32613F6CF6
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SCRIPT_DIR=$SCRIPT_DIR/../../scripts
ZIP_PATH="$SCRIPT_DIR/../build/distributions/java-lambda.zip"

DATABASE_URL=$1

if [ -z "$DATABASE_URL" ]; then
  echo "PostGres DB Connection expected. None found."
  exit 1
fi


AK_APP_SECRET=$2

if [ -z "$AK_APP_SECRET" ]; then
  echo "Account Kit App Secret expected. None found."
  exit 1
fi


STAGE=$3
if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

$SCRIPT_DIR/../gradlew build
$SCRIPT_DIR/update-lambda.sh $LAMBDA_NAME $ZIP_PATH $STAGE

aws lambda update-function-configuration \
  --function $LAMBDA_NAME-$STAGE \
  --handler $HANDLER \
  --environment "Variables={STAGE=$STAGE,AK_APP_ID=$AK_APP_ID,AK_APP_VERSION=$AK_APP_VERSION,AK_APP_SECRET=$AK_APP_SECRET,CSRF=$CSRF,DATABASE_URL=$DATABASE_URL}" \
  --profile $PROFILE
