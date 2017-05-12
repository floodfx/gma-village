#!/bin/bash

LAMBDA_NAME="messaging"
DESCRIPTION="Messaging Services for GMA Village"
GATEWAY_PATH="messaging"
HANDLER="com.gmavillage.lambda.api.MessagingLambdaHandler::handleRequest"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ZIP_PATH="$SCRIPT_DIR/../../build/distributions/java-lambda.zip"
SCRIPT_DIR=$SCRIPT_DIR/../../scripts
# every minute
CRON="cron(* 0-23 * * ? *)" 

STAGE=$1
if [ -z "$STAGE" ]; then
STAGE='dev'
fi
#VERSION=$STAGE

#FUNCTION_VERSION=$($SCRIPT_DIR/create-lambda.sh $LAMBDA_NAME $ZIP_PATH $HANDLER $STAGE)
#echo "Function Version: $FUNCTION_VERSION"
#FUNCTION_VERSION=$(sed -e 's/^"//' -e 's/"$//' <<< $FUNCTION_VERSION)

#$SCRIPT_DIR/create-lambda-alias.sh $LAMBDA_NAME $FUNCTION_VERSION $STAGE

$SCRIPT_DIR/create-cloudwatch-rule.sh $LAMBDA_NAME "$CRON" $STAGE

