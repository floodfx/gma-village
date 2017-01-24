#!/bin/bash

STAGE=$1

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

# every minute between 5pm UTC and midnight UTC 
# or 9am PT to 4pm PT
CRON1='cron(* 17-23 * * ? *)'
# every minute between midnight UTC and 3am UTC 
# or 4pm PT to 7pm PT
CRON2='cron(* 0-3 * * ? *)'

LAMBDA_FUNCTION_NAME="gma-village-sms-queue-$STAGE"
RULE_NAME_1="sms-queue-lambda-ping-rule-one-$STAGE"
RULE_NAME_2="sms-queue-lambda-ping-rule-two-$STAGE"

echo "Creating CloudWatch Rules"
# create rule 1
RULE_1_ARN=$(aws events put-rule \
  --name $RULE_NAME_1 \
  --description "[$STAGE] Rule to call Lambda function to have it pull messages from SMS queue." \
  --schedule-expression "$CRON1" \
  --state ENABLED \
  --query "RuleArn" \
  --profile gmavillage)
# remove quotes
RULE_1_ARN=$(sed -e 's/^"//' -e 's/"$//' <<< $RULE_1_ARN)

echo "Rule 1 Arn: $RULE_1_ARN"

# create rule 2
RULE_2_ARN=$(aws events put-rule \
  --name $RULE_NAME_2 \
  --description "[$STAGE] Rule to call Lambda function to have it pull messages from SMS queue." \
  --schedule-expression "$CRON2" \
  --state ENABLED \
  --query "RuleArn" \
  --profile gmavillage)

# remove quotes
RULE_2_ARN=$(sed -e 's/^"//' -e 's/"$//' <<< $RULE_2_ARN)

echo "Rule 2 Arn: $RULE_2_ARN"

echo "Adding Lambda Permissions..."
# add permission 1 to lambda
aws lambda add-permission \
  --function-name $LAMBDA_FUNCTION_NAME \
  --statement-id scheduled-gma-village-sms-queue-lambda-ping-one-$STAGE \
  --action 'lambda:InvokeFunction' \
  --principal events.amazonaws.com \
  --source-arn $RULE_1_ARN \
  --profile gmavillage

# add permission 2 to lambda
aws lambda add-permission \
  --function-name $LAMBDA_FUNCTION_NAME \
  --statement-id scheduled-gma-village-sms-queue-lambda-ping-two-$STAGE \
  --action 'lambda:InvokeFunction' \
  --principal events.amazonaws.com \
  --source-arn $RULE_2_ARN \
  --profile gmavillage

echo "Fetching Lambda ARN..."
# get lambda function arn
LAMBDA_ARN=$(aws lambda get-function \
  --function-name gma-village-sms-queue-$STAGE \
  --query "Configuration.FunctionArn" \
  --profile gmavillage
)

# remove quotes
LAMBDA_ARN=$(sed -e 's/^"//' -e 's/"$//' <<< $LAMBDA_ARN)
echo "Lambda ARN: $LAMBDA_ARN"

# add event target 1
aws events put-targets \
  --rule $RULE_NAME_1 \
  --targets "Id=1,Arn=$LAMBDA_ARN" \
  --profile gmavillage

# add event target 2
aws events put-targets \
  --rule $RULE_NAME_2 \
  --targets "Id=1,Arn=$LAMBDA_ARN" \
  --profile gmavillage

