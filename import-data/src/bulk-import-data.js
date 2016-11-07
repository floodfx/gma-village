var google = require('googleapis');
var authorize = require('./authorize')
var NameHelper = require('./name-helper')
var CareAgesHelper = require('./care-ages-helper')
var CareLocationsHelper = require('./care-locations-helper')
var CareExperiencesHelper = require('./care-experiences-helper')
var DemeanorsHelper = require('./demeanors-helper')
var EnumParserHelper = require('./enum-parser-helper')
var {
  Availability,
  CareAge,
  CareExperience,
  CareLocation,
  CareTraining,
  Demeanor,
  Neighborhood,
  Gma
} = require('../../data-model/index')

var bulkimport = (spreadsheet_id, auth) => {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: spreadsheet_id,
    range: 'Form Responses 1!A2:M',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      var cleanData = [];
      for (var i = 0; i < rows.length; i++) {
        // check for missing data first
        var data = rows[i];
        var valid = allColumnsContainData(data)
        if(!valid) {
          console.log(`\n\nWARNING: Missing data at row[${i}]\n\n`)
        }
        var [timestampRaw,
             nameRaw,
             phoneRaw,
             neighborhoodRaw,
             isAvailableOutsideNeightborhoodRaw,
             careAgesRaw,
             availabilitiesRaw,
             careLocationsRaw,
             demeanorsRaw,
             whyCareForKidsText,
             careExperiencesRaw,
             careTrainingsRaw,
             additionalInformationText] = data;
        // console.log("data", data)

        var {first_name, last_name} = NameHelper.parse(nameRaw);
        var phone = phoneRaw;
        var neighborhood = Neighborhood.parse(neighborhoodRaw);
        var isAvailableOutsideNeightborhood = isAvailableOutsideNeightborhoodRaw === 'yes'
        var careAges = EnumParserHelper.parseAll(careAgesRaw, CareAge, CareAgesHelper.VALID_VALUES_MAP);
        var availabilities = EnumParserHelper.parseAll(availabilitiesRaw, Availability, {}, true);
        var careLocations = EnumParserHelper.parseAll(careLocationsRaw, CareLocation, CareLocationsHelper.VALID_VALUES_MAP);
        var demeanors = EnumParserHelper.parseAll(demeanorsRaw, Demeanor, DemeanorsHelper.VALID_VALUES_MAP, true);
        var careExperiences = EnumParserHelper.parseAll(careExperiencesRaw, CareExperience, CareExperiencesHelper.VALID_VALUES_MAP, true);
        var careTrainings = EnumParserHelper.parseAll(careTrainingsRaw, CareTraining, {}, true);

        var gma = new Gma(
          first_name, last_name, phone, neighborhood, isAvailableOutsideNeightborhood,
          careAges, availabilities.valids, careLocations, demeanors.valids, whyCareForKidsText,
          careExperiences.valids, careTrainings.valids, additionalInformationText
        )

        console.log(gma.toString())
        // console.log('\n\n%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s',
        //   timestamp, name, neighborhood, isAvailableOutsideArea, careAges,
        //   availabilities, careLocations, demeanors, enjoyCaringForKidsText,
        //   careExperiences, careTrainings, additionalInformationText);

      }
      // save clean data

    }
  });
}

var allColumnsContainData = (row, expectedCols = 13) => {
  var valid = true;
  for(var i = 0; i < expectedCols; i++) {
    var isEmpty = (row[i] === undefined || row[i] === 'undefined' ||
                   row[i] == null || row[i] === '');
    if(isEmpty) {
      console.log(`col[${i}] (${row[i]}) is empty`)
    }
    valid &= !isEmpty
  }
  return valid
}




module.exports = bulkimport
