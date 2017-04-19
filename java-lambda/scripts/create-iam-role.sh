#!/bin/bash -e

PROFILE=gmavillage
ROLE_NAME=$1
ROLE_POLICY_DOC=$2
STAGE=$3

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

aws iam create-role \
  --role-name "$ROLE_NAME-$STAGE" \
  --assume-role-policy-document file://$ROLE_POLICY_DOC \
  --profile $PROFILE

aws iam attach-role-policy \
  --role-name "$ROLE_NAME-$STAGE" \
  --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole" \
  --profile $PROFILE
