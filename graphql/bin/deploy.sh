#!/bin/bash

# make sure we are using gma-village project
gcloud config configurations activate gma-village

STAGE=$1
AK_APP_SECRET=$2

tempfile=`mktemp`
uuid=`uuidgen`
sed "s/YOUR_AK_APP_SECRET/${AK_APP_SECRET}/g; s/STAGE/${STAGE}/g; s/UUID/${uuid}/g" app.yaml > app-prod.yaml

# deploy dev app config
gcloud app deploy app-prod.yaml
