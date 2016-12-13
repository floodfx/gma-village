var nconf = module.exports = require('nconf')
var guid = require('guid')

nconf
  .argv() // command line args
  .env([  // environment vars
    'GOOGLE_PROJECT_ID',
    'DATASTORE_EMULATOR_URL',
    'CORS_DOMAIN_WHITELIST_CSV',
    'AK_APP_ID',
    'AK_APP_SECRET',
    'AK_APP_VERSION',
    'CSRF'
  ])
  .defaults({
    GOOGLE_PROJECT_ID: 'gma-village',
    DATASTORE_EMULATOR_URL: '',
    CORS_DOMAIN_WHITELIST_CSV: 'app.gmavillage.com',
    AK_APP_ID: '1864284563828976',
    AK_APP_SECRET: '',
    AK_APP_VERSION: 'v1.1',
    CSRF: guid.raw() // generate csrf by defaut
  })
