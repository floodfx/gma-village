#!/bin/bash

STAGE=$1
if [ -z "$STAGE" ]; then
  STAGE='dev'
fi
BUCKET='gmavillage-web-dev'
DISTRO_ID='EIOULF06RQMBW'
if [ "$STAGE" == "prod" ]; then
  BUCKET='gmavillage-web'
  DISTRO_ID='E1723CTSEUKZBP'
fi

echo "Deploying Gma Village... STAGE:$STAGE, BUCKET:$BUCKET"

# build production react app
REACT_APP_STAGE=$STAGE npm run build

# upload to s3
echo "Uploading build to S3"
aws s3 sync build/ s3://$BUCKET --profile gmavillage
echo "Upload complete"

#create invalidation for cloud front
echo "Invalidating CloudFront Distro"
invalidationId=$(aws cloudfront create-invalidation \
  --distribution-id $DISTRO_ID \
  --paths "/*" \
  --profile gmavillage \
  --query 'Invalidation.Id')

# remove leading and trailing quotes
invalidationId=$(sed -e 's/^"//' -e 's/"$//' <<< $invalidationId)

echo "Waiting for invalidation to complete... (Could take a while)"
# wait for resolution
aws cloudfront wait invalidation-completed \
  --distribution-id $DISTRO_ID \
  --id ${invalidationId} \
  --profile gmavillage
echo "Done"
