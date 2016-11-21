#!/bin/bash

# build production react app
npm run build

# ensure gma-village gcloud configuration activated
gcloud config configurations activate gma-village

# deploy
gcloud app deploy
