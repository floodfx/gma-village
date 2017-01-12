#!/bin/bash

# build production react app
npm run build

# upload to s3
aws s3 sync build/ s3://gmavillage-web --profile gmavillage

# create invalidation for cloud front
aws cloudfront create-invalidation \
  --distribution-id E1723CTSEUKZBP \
  --paths "/*" \
  --profile gmavillage

echo "Now run this: aws cloudfront wait invalidation-completed --distribution-id E1723CTSEUKZBP --id INVALIDATIONID --profile gmavillage"
