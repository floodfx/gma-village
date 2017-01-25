var assert = require('assert');
var { 
  filterGmas
} = require('../src/careNeed/matcher');
var moment = require('moment');

var { Neighborhood, CareLocation, CareAge } = require('gma-village-data-model');

describe('CareNeed', function() {
  describe('matcher', function() {
    it('should find', function() {
      
      var gma1 = newGma(1, NOAK, null, [CLC, CLP], [CA0, CA1, CA2], false);
      var gma2 = newGma(2, EOAK, null, [CLC], [CA1, CA2, CA3], false);
      var gma3 = newGma(3, BERK, null, [CLP], [CA2, CA3], false);
      var gma4 = newGma(4, OTH, "Denver", [CLP], [CA3], false);
      var gma5 = newGma(5, NOAK, null, [CLC, CLP], [CA0, CA1, CA2], true);      
      var gma6 = newGma(6, EOAK, null, [CLC], [CA1, CA2, CA3], true);
      var gma7 = newGma(7, BERK, null, [CLP], [CA2, CA3], true);
      var gma8 = newGma(8, OTH, "Denver", [CLP], [CA3], true);

      var gmasIn = [gma1,gma2,gma3,gma4,gma5,gma6,gma7,gma8];

      assert.deepEqual(
        filterGmas(gmasIn, WOAK, null, [CLC], [CA0]), 
        [gma5]
      )

      assert.deepEqual(
        filterGmas(gmasIn, WOAK, null, [CLC], [CA0, CA3]), 
        []
      )

      assert.deepEqual(
        filterGmas(gmasIn, WOAK, null, [CLP], [CA2, CA3]), 
        [gma7]
      )

      assert.deepEqual(
        filterGmas(gmasIn, NOAK, null, [CLC], [CA0]), 
        [gma1, gma5]
      )

      assert.deepEqual(
        filterGmas(gmasIn, NOAK, null, [CLC, CLP], [CA0]), 
        [gma1, gma5]
      )

      assert.deepEqual(
        filterGmas(gmasIn, NOAK, null, [CLC, CLP], [CA0, CA3]), 
        []
      )

      assert.deepEqual(
        filterGmas(gmasIn, NOAK, null, [CLC, CLP], [CA0, CA3]), 
        []
      )

      assert.deepEqual(
        filterGmas(gmasIn, OTH, "Denver", [CLP], [CA3]), 
        [gma4, gma7, gma8]
      )

      assert.deepEqual(
        filterGmas(gmasIn, OTH, "SF", [CLC, CLP], [CA0, CA3]), 
        []
      )
    })
  })
})

const NOAK = Neighborhood.NORTH_OAKLAND.name;
const EOAK = Neighborhood.EAST_OAKLAND.name;
const BERK = Neighborhood.BERKELEY.name;
const WOAK = Neighborhood.WEST_OAKLAND.name;
const OTH = Neighborhood.OTHER.name;

const CLC = CareLocation.CHILDS_HOME;
const CLP = CareLocation.PROVIDERS_HOME;

const CA0 = CareAge.ZERO_TO_SIX_MONTHS;
const CA1 = CareAge.SIX_MONTHS_TO_TWO_YEARS;
const CA2 = CareAge.TWO_YEARS_TO_FIVE_YEARS;
const CA3 = CareAge.FIVE_YEARS_PLUS;

const newGma = (id, neighborhood, otherNeighborhood, careLocations, careAges, isAvailableOutsideNeighborhood) => {
  return {
    id,
    neighborhood,
    otherNeighborhood,
    careLocations,
    careAges,
    isAvailableOutsideNeighborhood
  }
}



