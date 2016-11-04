var google = require('googleapis');
var authorize = require('./authorize')

var bulkimport = (spreadsheet_id, auth) => {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: spreadsheet_id,
    range: 'Form Responses 1!A2:L',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log('%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s',
          row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[47], row[8], row[9], row[10], row[11]);
      }
    }
  });
}

module.exports = bulkimport
