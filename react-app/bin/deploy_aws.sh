#!/bin/bash

# build production react app
npm run build

# upload to s3
echo "Uploading build to S3"
aws s3 sync build/ s3://gmavillage-web --profile gmavillage
echo "Upload complete"

#create invalidation for cloud front
echo "Invalidating CloudFront Distro"
invalidationId=$(aws cloudfront create-invalidation \
  --distribution-id E1723CTSEUKZBP \
  --paths "/*" \
  --profile gmavillage \
  --query 'Invalidation.Id')

# remove leading and trailing quotes
invalidationId=$(sed -e 's/^"//' -e 's/"$//' <<< $invalidationId)

echo "Waiting for invalidation to complete... (Could take a while)"
# wait for resolution
aws cloudfront wait invalidation-completed \
  --distribution-id E1723CTSEUKZBP \
  --id ${invalidationId} \
  --profile gmavillage
echo "Done"
