var nconf = module.exports = require('nconf')

nconf
  .argv() // command line args
  .env([  // environment vars
    'SCOPES',
    'SPREADSHEET_ID'
  ])
  .defaults({
    SCOPES: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    SPREADSHEET_ID: '',
  })
