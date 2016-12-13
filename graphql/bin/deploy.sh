#!/bin/bash

# make sure we are using gma-village project
gcloud config configurations activate gma-village

AK_APP_SECRET=$1

tempfile=`mktemp`
sed "s/YOUR_AK_APP_SECRET/${AK_APP_SECRET}/g" app.yaml > $tempfile

# deploy dev app config
gcloud app deploy $tempfile
