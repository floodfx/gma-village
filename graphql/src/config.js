var nconf = module.exports = require('nconf')
var guid = require('guid')

nconf
  .argv() // command line args
  .env([  // environment vars
    'GOOGLE_PROJECT_ID',
    'GOOGLE_CLOUD_BUCKET',
    'DATASTORE_EMULATOR_URL',
    'CORS_DOMAIN_WHITELIST_CSV',
    'AK_APP_ID',
    'AK_APP_SECRET',
    'AK_APP_VERSION',
    'CSRF',
    'SNS_AWS_ACCESS_KEY',
    'SNS_AWS_SECRET_ACCESS_KEY',
    'SNS_REGION'
  ])
  .defaults({
    GOOGLE_PROJECT_ID: 'gma-village',
    GOOGLE_CLOUD_BUCKET: 'gma-village-public-assets',
    DATASTORE_EMULATOR_URL: '',
    CORS_DOMAIN_WHITELIST_CSV: 'app.gmavillage.com,d11duxgajl8mtp.cloudfront.net',
    AK_APP_ID: '1864284563828976',
    AK_APP_SECRET: '',
    AK_APP_VERSION: 'v1.1',
    CSRF: '',
    SNS_AWS_ACCESS_KEY: '',
    SNS_AWS_SECRET_ACCESS_KEY: '',
    SNS_REGION: 'us-west-2'
  })
