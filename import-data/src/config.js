var nconf = module.exports = require('nconf')

nconf
  .argv() // command line args
  .env([  // environment vars
    'SPREADSHEET_API_SCOPES',
    'SPREADSHEET_ID',
    'GOOGLE_PROJECT_ID',
    'DATASTORE_EMULATOR_URL'
  ])
  .defaults({
    SPREADSHEET_API_SCOPES: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    SPREADSHEET_ID: '',
    GOOGLE_PROJECT_ID: 'gma-village',
    DATASTORE_EMULATOR_URL: ''
  })
