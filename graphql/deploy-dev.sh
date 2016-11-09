#!/bin/bash

# make sure we are using gma-village project
gcloud config configurations activate gma-village

# deploy dev app config
gcloud app deploy app-dev.yaml
