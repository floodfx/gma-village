#!/bin/bash

# make sure we are using gma-village project
gcloud config configurations activate gma-village

STAGE=$1
AK_APP_SECRET=$2
SQS_AWS_ACCESS_KEY=$3
SQS_AWS_SECRET_KEY=$4
SQS_QUEUE_URL=$5

tempfile=`mktemp`
uuid=`uuidgen`
sed "s/YOUR_AK_APP_SECRET/${AK_APP_SECRET}/g; s/STAGE/${STAGE}/g; s/UUID/${uuid}/g; s/YOUR_SQS_AWS_ACCESS_KEY/${SQS_AWS_ACCESS_KEY}/g; s/YOUR_SQS_AWS_SECRET_KEY/${SQS_AWS_SECRET_KEY}/g; s/YOUR_SQS_QUEUE_URL/'${SQS_QUEUE_URL}/g" app.yaml > app-prod.yaml

# deploy dev app config
gcloud app deploy app-prod.yaml
