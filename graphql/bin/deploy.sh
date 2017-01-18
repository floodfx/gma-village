#!/bin/bash

# make sure we are using gma-village project
gcloud config configurations activate gma-village

STAGE=$1
AK_APP_SECRET=$2
SNS_AWS_ACCESS_KEY=$3
SNS_AWS_SECRET_KEY=$4

tempfile=`mktemp`
uuid=`uuidgen`
sed "s/YOUR_AK_APP_SECRET/${AK_APP_SECRET}/g; s/STAGE/${STAGE}/g; s/UUID/${uuid}/g; s/YOUR_AWS_ACCESS_KEY/${SNS_AWS_ACCESS_KEY}/g; s/YOUR_AWS_SECRET_KEY/${SNS_AWS_SECRET_KEY}/g" app.yaml > app-prod.yaml

# deploy dev app config
gcloud app deploy app-prod.yaml
