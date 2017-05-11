var { CareAge, Neighborhood, CareLocation } = require('gma-village-data-model');
var moment = require('moment');

const kidsAgesToCareAges = (kids) => {
  var sixMonthsAgo = moment().subtract(6, 'months');
  var twoYearsAgo = moment().subtract(2, 'years');
  var fiveYearsAgo = moment().subtract(5, 'years');
  
  return Object.keys(kids.map((kid) => {
    var kidBirthday = moment.unix(kid.birthday);
    if(kidBirthday.isAfter(sixMonthsAgo)) {
      return CareAge.ZERO_TO_SIX_MONTHS.name;
    }
    else if(kidBirthday.isAfter(twoYearsAgo)) {
      return CareAge.SIX_MONTHS_TO_TWO_YEARS.name;
    }
    else if(kidBirthday.isAfter(fiveYearsAgo)) {
      return CareAge.TWO_YEARS_TO_FIVE_YEARS.name;
    }
    else {
      return CareAge.FIVE_YEARS_PLUS.name;
    }
  }).reduce((map, value) => {
    map[value]=value;
    return map;
  }, {}));
}

const matchGmasToCareNeed = (gmas, careNeed) => {
  console.log("gmas", gmas, "careNeed", careNeed);
  var matchedGmas = filterGmas(gmas, 
    careNeed.neighborhood, 
    careNeed.other_neighborhood, 
    careNeed.care_locations, 
    kidsAgesToCareAges(careNeed.kids)
  )
  console.log("matchGmas", matchedGmas)
  return matchedGmas;
}

const filterGmas = (gmas, neighborhood, other_neighborhood, care_locations, care_ages) => {
  return gmas.filter((gma) => {
    var sameNeighborhood = 
      (care_locations.includes(CareLocation.CHILDS_HOME.name) && gma.available_outside_neighborhood) ||
      ((gma.neighborhood === neighborhood) && (gma.neighborhood !== Neighborhood.OTHER.name)) ||
      ((gma.other_neighborhood === other_neighborhood) && (gma.neighborhood === Neighborhood.OTHER.name));
    var sameCareLocation = care_locations.reduce((truth, loc) => truth || gma.care_locations.includes(loc), false);
    var sameCareAges = care_ages.reduce((truth, age) => truth && gma.care_ages.includes(age), true);
    return sameNeighborhood && sameCareLocation && sameCareAges;
  })
}

module.exports = {
  matchGmasToCareNeed,
  filterGmas,  
  kidsAgesToCareAges
}