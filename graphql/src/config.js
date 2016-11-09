var nconf = module.exports = require('nconf')

nconf
  .argv() // command line args
  .env([  // environment vars
    'GOOGLE_PROJECT_ID',
    'DATASTORE_EMULATOR_URL'
  ])
  .defaults({
    GOOGLE_PROJECT_ID: 'gma-village',
    DATASTORE_EMULATOR_URL: ''
  })
