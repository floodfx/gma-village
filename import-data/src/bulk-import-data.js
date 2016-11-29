var google = require('googleapis');
var authorize = require('./authorize')
var NameHelper = require('./name-helper')
var PhoneHelper = require('./phone-helper')
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
  City,
  Demeanor,
  Neighborhood,
  Gma
} = require('gma-village-data-model')
var { GmaDAO } = require('gma-village-data-access')
var gmaDao = new GmaDAO()

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
             isAvailableOutsideNeighborhoodRaw,
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
        var phone = PhoneHelper.parse(phoneRaw);
        var neighborhood = EnumParserHelper.parseAll(neighborhoodRaw, Neighborhood, {}, true);
        var isAvailableOutsideNeighborhood = isAvailableOutsideNeighborhoodRaw === 'yes'
        var careAges = EnumParserHelper.parseAll(careAgesRaw, CareAge, CareAgesHelper.VALID_VALUES_MAP);
        var availabilities = EnumParserHelper.parseAll(availabilitiesRaw, Availability, {}, true);
        var careLocations = EnumParserHelper.parseAll(careLocationsRaw, CareLocation, CareLocationsHelper.VALID_VALUES_MAP);
        var demeanors = EnumParserHelper.parseAll(demeanorsRaw, Demeanor, DemeanorsHelper.VALID_VALUES_MAP, true);
        var careExperiences = EnumParserHelper.parseAll(careExperiencesRaw, CareExperience, CareExperiencesHelper.VALID_VALUES_MAP, true);
        var careTrainings = EnumParserHelper.parseAll(careTrainingsRaw, CareTraining, {}, true);

        var gma = new Gma(
          undefined,
          first_name,
          last_name,
          phone,
          availabilities.values,
          availabilities.others,
          careAges,
          careExperiences.values,
          careExperiences.others,
          careLocations,
          careTrainings.values,
          careTrainings.others,
          City.OAKLAND.name,
          demeanors.values,
          demeanors.others,
          neighborhood.values.length > 0 ? neighborhood.values[0] : "",
          neighborhood.others.length > 0 ? neighborhood.others[0] : "",
          isAvailableOutsideNeighborhood,
          whyCareForKidsText,
          additionalInformationText
        )

        // console.log("\n\n\n\n", gma.toString())

        saveGma(gma)
      }

    }
  });
}

const saveGma = (gma) => {
  gmaDao.gmaByPhone(gma.phone)
    .then(foundGma => {
      if(foundGma) {
        console.log(`gma with phone ${gma.phone}, alread exists. ${foundGma.id}`)
        //TODO update?
      } else {
        // console.log("saving gma", gma)
        gmaDao.saveGma(gma)
      }
    })
    .catch(err => {
      console.log("error finding gma by phone", err)
    })
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
