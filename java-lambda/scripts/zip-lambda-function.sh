#!/bin/bash -e

DIR_PREFIX=$1
LAMBDA_NAME=$2
STAGE=$3

if [ -z "$DIR_PREFIX" ]; then
  echo "Directory Prefix expected. None found."
  exit 1
fi

if [ -z "$LAMBDA_NAME" ]; then
  echo "Lambda name expected. None found."
  exit 1
fi

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

cd $DIR_PREFIX
ZIP_NAME="$LAMBDA_NAME-$STAGE.zip"
[ -e $ZIP_NAME ] && rm $ZIP_NAME
zip -q -r $ZIP_NAME package.json *.js src lib node_modules/*
