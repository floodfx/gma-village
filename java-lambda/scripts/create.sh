#!/bin/bash

LAMBDA_NAME="accountkit"
DESCRIPTION="Account Kit Services for GMA Village"
GATEWAY_PATH="accountkit"
ZIP_PATH="../build/distributions/java-lambda.zip"
HANDLER="com.gmavillage.lambda.accountkit.LambdaHandler::handleRequest"

STAGE=$1
if [ -z "$STAGE" ]; then
STAGE='dev'
fi
VERSION=$STAGE

FUNCTION_VERSION=$(./create-lambda.sh $LAMBDA_NAME $ZIP_PATH $HANDLER $STAGE)
echo "Function Version: $FUNCTION_VERSION"
FUNCTION_VERSION=$(sed -e 's/^"//' -e 's/"$//' <<< $FUNCTION_VERSION)

./create-lambda-alias.sh $LAMBDA_NAME $FUNCTION_VERSION $STAGE

REST_API_ID=$(./create-apigateway.sh $LAMBDA_NAME "$DESCRIPTION" $GATEWAY_PATH $VERSION ./templates/swagger-template.json $STAGE)
REST_API_ID=$(sed -e 's/^"//' -e 's/"$//' <<< $REST_API_ID)

./create-apigateway-stage.sh $REST_API_ID $STAGE

./create-apigateway-lambda-permission.sh $REST_API_ID $LAMBDA_NAME $STAGE
