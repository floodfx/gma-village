var authorize = require('./src/authorize')
var bulkimport = require('./src/bulk-import-data')
var config = require('./src/config')

var SCOPES = config.get('SPREADSHEET_API_SCOPES');
var SPREADSHEET_ID = config.get('SPREADSHEET_ID');

authorize(SCOPES)
  .then(authClient => {
    bulkimport(SPREADSHEET_ID, authClient);
  }).catch(err => {
    console.log(err)
  });
