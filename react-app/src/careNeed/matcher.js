var { CareAge } = require('gma-village-data-model');
var moment = require('moment');

const childrenAgesToCareAges = (children) => {
  var sixMonthsAgo = moment().subtract(6, 'months');
  var twoYearsAgo = moment().subtract(2, 'years');
  var fiveYearsAgo = moment().subtract(5, 'years');

  return Object.keys(children.map((child) => {
    const dob = child.dob;
    var childBirthday = moment([dob.year, dob.month, dob.day]);
    if(childBirthday.isAfter(sixMonthsAgo)) {
      return CareAge.ZERO_TO_SIX_MONTHS.name;
    }
    else if(childBirthday.isAfter(twoYearsAgo)) {
      return CareAge.SIX_MONTHS_TO_TWO_YEARS.name;
    }
    else if(childBirthday.isAfter(fiveYearsAgo)) {
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

const sameCareAges = (gma, care_ages) => {
  // console.log("care_ages", care_ages);
  // console.log("gma.care_ages", gma.care_ages);
  return care_ages.reduce((truth, age) => {
    // console.log("age", age);
    const match = gma.care_ages.includes(age);
    // console.log("match", match);
    return truth && match;
  }, true);
}

const sameCareLocation = (gma, care_locations) => {
  // console.log("care_locations", care_locations);
  // console.log("gma.care_locations", gma.care_locations);
  return care_locations.reduce((truth, loc) => {
    // console.log("location", loc);
    const match = gma.care_locations.includes(loc);
    // console.log("match", match);
    return truth || match;
  }, false);
}

const sameNeighborhood = (gma, care_locations, neighborhood, other_neighborhood) => {
  var elsewhereMatch = care_locations.includes('ELSEWHERE') && gma.available_outside_neighborhood;
  var neighborhoodMatch = false;
  if(gma.neighborhood.label === 'OTHER_OAKLAND') {
    // console.log("gma.other_neighborhood", gma.other_neighborhood)
    // console.log("other_neighborhood", other_neighborhood)
    neighborhoodMatch = gma.other_neighborhood === other_neighborhood;
  } else {
    // console.log("gma.neighborhood", gma.neighborhood)
    // console.log("neighborhood", neighborhood)
    neighborhoodMatch = gma.neighborhood.label === neighborhood;
  }
  return elsewhereMatch || neighborhoodMatch;
}

const filterGmas = (gmas, neighborhood, other_neighborhood, care_locations, care_ages) => {
  return gmas.filter((gma) => {
    // console.log("filtering gma", gma)
    var locationMatch = sameNeighborhood(gma, care_locations, neighborhood, other_neighborhood);
    var careLocationMatch = sameCareLocation(gma, care_locations);
    var careAgeMatch = sameCareAges(gma, care_ages);
    // console.log("locationMatch", locationMatch)
    // console.log("careLocationMatch", careLocationMatch)
    // console.log("careAgeMatch", careAgeMatch)
    return locationMatch && careLocationMatch && careAgeMatch;
  })
}

const matchGmasToCareNeed = (gmas, careNeed) => {
  // console.log("gmas", gmas, "careNeed", careNeed);
  var matchedGmas = filterGmas(gmas,
    careNeed.neighborhood,
    careNeed.other_neighborhood,
    careNeed.care_locations,
    childrenAgesToCareAges(careNeed.children)
  )
  // console.log("matchGmas", matchedGmas)
  return matchedGmas;
}

module.exports = {
  matchGmasToCareNeed,
  filterGmas,
  childrenAgesToCareAges
}
