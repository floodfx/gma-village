#!/bin/bash

STAGE=$1

if [ -z "$STAGE" ]; then
  STAGE='dev'
fi

rm sms-queue-lambda-$STAGE.zip
zip -q -r sms-queue-lambda-$STAGE.zip package.json index.js node_modules/*
