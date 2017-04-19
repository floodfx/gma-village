#!/bin/bash

PROFILE=gmavillage
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LAMBDA_NAME="accountkit"
ZIP_PATH="../build/distributions/java-lambda.zip"
HANDLER="com.gmavillage.lambda.accountkit.LambdaHandler::handleRequest"

# DB_CONNECTION=$1

# if [ -z "$DB_CONNECTION" ]; then
#   echo "PostGres DB Connection expected. None found."
#   exit 1
# fi
# --environment "Variables={DB_CONNECTION=$DB_CONNECTION}" \

STAGE=$1
if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

cd ../
./gradlew build
cd scripts
./update-lambda.sh $LAMBDA_NAME $ZIP_PATH $STAGE

aws lambda update-function-configuration \
  --function $LAMBDA_NAME-$STAGE \
  --handler $HANDLER \
  --profile $PROFILE
