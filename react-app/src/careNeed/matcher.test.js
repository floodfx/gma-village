var assert = require('assert');
var {
  matchGmasToCareNeed,
  filterGmas,
  childrenAgesToCareAges
} = require('./matcher');
var moment = require('moment');

var { Neighborhood, CareLocation, CareAge } = require('gma-village-data-model');

describe('CareNeed', function() {
  describe('childrenAgesToCareAges', function() {
    it('should work', function() {

      var threeMonths = {dob: momentToDob(moment().subtract(3, 'months'))};
      var almostSixMonths = {dob: momentToDob(moment().subtract(6, 'months').add(2, 'days'))};
      var justSixMonths = {dob: momentToDob(moment().subtract(6, 'months').subtract(2, 'days'))};
      var oneYear = {dob: momentToDob(moment().subtract(1, 'year'))};
      var oneYear10Mos = {dob: momentToDob(moment().subtract(1, 'year').subtract(10, 'months'))};
      var justTwo = {dob: momentToDob(moment().subtract(2, 'year').subtract(2, 'days'))};
      var almostFive = {dob: momentToDob(moment().subtract(5, 'years').add(2, 'days'))};
      var justFive = {dob: momentToDob(moment().subtract(5, 'years').subtract(2, 'days'))};
      var six = {dob: momentToDob(moment().subtract(6, 'years'))};
      var ten = {dob: momentToDob(moment().subtract(10, 'years'))};

      assert.deepEqual(
        childrenAgesToCareAges([threeMonths])
        [CA0]
      )

      assert.deepEqual(
        childrenAgesToCareAges([threeMonths, almostSixMonths])
        [CA0]
      )

      assert.deepEqual(
        childrenAgesToCareAges([justSixMonths])
        [CA1]
      )

      assert.deepEqual(
        childrenAgesToCareAges([justSixMonths, oneYear])
        [CA1]
      )

      assert.deepEqual(
        childrenAgesToCareAges([oneYear, justTwo])
        [CA1, CA2]
      )

      assert.deepEqual(
        childrenAgesToCareAges([justTwo, almostFive])
        [ CA2]
      )

      assert.deepEqual(
        childrenAgesToCareAges([justTwo, justFive])
        [CA2, CA3]
      )

      assert.deepEqual(
        childrenAgesToCareAges([justTwo, justFive, six])
        [CA2, CA3]
      )

      assert.deepEqual(
        childrenAgesToCareAges([almostSixMonths, six])
        [CA0, CA3]
      )

    })
  })
})

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
        []
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

      expect(
      filterGmas(gmasIn, OTH, "Denver", [CLP], [CA3]))
      .toEqual([gma4, gma8])

      assert.deepEqual(
        filterGmas(gmasIn, OTH, "SF", [CLC, CLP], [CA0, CA3]),
        []
      )
    })
  })
})

const momentToDob = (moment) => {
  return [moment.year, moment.month, moment.day]
}

const NOAK = Neighborhood.NORTH_OAKLAND.name;
const EOAK = Neighborhood.EAST_OAKLAND.name;
const BERK = Neighborhood.BERKELEY.name;
const WOAK = Neighborhood.WEST_OAKLAND.name;
const OTH = Neighborhood.OTHER.name;

const CLC = CareLocation.CHILDS_HOME.name;
const CLP = CareLocation.PROVIDERS_HOME.name;

const CA0 = CareAge.ZERO_TO_SIX_MONTHS.name;
const CA1 = CareAge.SIX_MONTHS_TO_TWO_YEARS.name;
const CA2 = CareAge.TWO_YEARS_TO_FIVE_YEARS.name;
const CA3 = CareAge.FIVE_YEARS_PLUS.name;

const newGma = (id, neighborhood, other_neighborhood, care_locations, care_ages, available_outside_neighborhood) => {
  return {
    id,
    neighborhood,
    other_neighborhood,
    care_locations,
    care_ages,
    available_outside_neighborhood
  }
}
