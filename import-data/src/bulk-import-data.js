var google = require('googleapis');
var authorize = require('./authorize')
var cleanName = require('./name-helper')

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
        var [timestamp,
             name,
             neighborhood,
             isAvailableOutsideArea,
             careAges,
             availabilities,
             careLocations,
             demeanors,
             enjoyCaringForKidsText,
             careExperiences,
             careTrainings,
             additionalInformationText] = rows[i];
        var {first_name, last_name} = cleanName(name)
        console.log("first", first_name, "last", last_name)
        console.log('\n\n%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s',
          timestamp, name, neighborhood, isAvailableOutsideArea, careAges,
          availabilities, careLocations, demeanors, enjoyCaringForKidsText,
          careExperiences, careTrainings, additionalInformationText);
        var {first_name, last_name} = cleanName(name)
      }
    }
  });
}




module.exports = bulkimport
