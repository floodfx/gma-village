#!/bin/bash

LAMBDA_NAME="accountkit"
DESCRIPTION="Account Kit Services for GMA Village"
GATEWAY_PATH="accountkit"
ZIP_PATH="../build/distributions/java-lambda.zip"
HANDLER="com.gmavillage.lambda.accountkit.LambdaHandler::handleRequest"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SCRIPT_DIR=$SCRIPT_DIR/../../scripts

STAGE=$1
if [ -z "$STAGE" ]; then
STAGE='dev'
fi
VERSION=$STAGE

FUNCTION_VERSION=$($SCRIPT_DIR/create-lambda.sh $LAMBDA_NAME $ZIP_PATH $HANDLER $STAGE)
echo "Function Version: $FUNCTION_VERSION"
FUNCTION_VERSION=$(sed -e 's/^"//' -e 's/"$//' <<< $FUNCTION_VERSION)

$SCRIPT_DIR/create-lambda-alias.sh $LAMBDA_NAME $FUNCTION_VERSION $STAGE

REST_API_ID=$($SCRIPT_DIR/create-apigateway.sh $LAMBDA_NAME "$DESCRIPTION" $GATEWAY_PATH $VERSION $SCRIPT_DIR/templates/swagger-template.json $STAGE)
REST_API_ID=$(sed -e 's/^"//' -e 's/"$//' <<< $REST_API_ID)

$SCRIPT_DIR/create-apigateway-stage.sh $REST_API_ID $STAGE

$SCRIPT_DIR/create-apigateway-lambda-permission.sh $REST_API_ID $LAMBDA_NAME $STAGE
