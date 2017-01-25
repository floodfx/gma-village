var {
  saveUser,
  userById,
  findByPhone,
  listUserByType,
  isAdmin,
  isGma,
  isParent
} = require('../user/user');
var { CareAge, Neighborhood } = require('gma-village-data-model');
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

const matchGmas = (neighborhood, otherNeighborhood, careLocations, careAges) => {
  var gmas = listUserByType("Gma", true).then((allGmas) => {
     return filterGmas(allGmas, neighborhood, otherNeighborhood, careLocations, careAges);
  })
}

const filterGmas = (gmas, neighborhood, otherNeighborhood, careLocations, careAges) => {
  return gmas.filter((gma) => {
    var sameNeighborhood = 
      gma.isAvailableOutsideNeighborhood ||
      ((gma.neighborhood === neighborhood) && (gma.neighborhood !== Neighborhood.OTHER.name)) ||
      ((gma.otherNeighborhood === otherNeighborhood) && (gma.neighborhood === Neighborhood.OTHER.name));
    var sameCareLocation = careLocations.reduce((truth, loc) => truth || gma.careLocations.includes(loc), false);
    var sameCareAges = careAges.reduce((truth, age) => truth && gma.careAges.includes(age), true);
    return sameNeighborhood && sameCareLocation && sameCareAges;
  })
}

module.exports = {
  filterGmas,
  matchGmas,
  kidsAgesToCareAges
}