var {
  saveUser,
  userById,
  findByPhone,
  listUserByType,
  isAdmin,
  isGma,
  isParent
} = require('../user/user');
var { Neighborhood } = require('gma-village-data-model');

const matchGmas = (neighborhood, otherNeighborhood, careLocations, careAges) => {
  var gmas = listUserByType("Gma", true).then((allGmas) => {
     
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
  matchGmas
}