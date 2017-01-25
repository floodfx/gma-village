var assert = require('assert');
var {  
  CareLocation,
  Neighborhood,
  CareAge
} = require('gma-village-data-model')
var moment = require('moment');
var CareNeedDAO = require('../src/google-datastore/care-need-dao');


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

const threeMonths = moment().subtract(3, 'months');
const almostSixMonths = moment().subtract(6, 'months').add(2, 'days');
const justSixMonths = moment().subtract(6, 'months').subtract(2, 'days');
const oneYear = moment().subtract(1, 'year');
const oneYear10Mos = moment().subtract(1, 'year').subtract(10, 'months');
const justTwo = moment().subtract(2, 'year').subtract(2, 'days');
const almostFive = moment().subtract(5, 'years').add(2, 'days');
const justFive = moment().subtract(5, 'years').subtract(2, 'days');
const six = moment().subtract(6, 'years');
const ten = moment().subtract(10, 'years');

var careNeed = {
  parentId: "1234",
  neighborhood: NOAK,
  careLocations: [CLC, CLP],
  kids: [
    {birthday: threeMonths.unix()},
    {birthday: justTwo.unix()}
  ],
  startDateTimeOfNeed: moment().add(30, 'hours').unix(),
  endDateTimeOfNeed: moment().add(36, 'hours').unix(),
  gmas: [
    {id:"111",phone:"1112223333"},
    {id:"222",phone:"2223334444"},
    {id:"333",phone:"3334445555"}
  ]
}

var careNeedDao = new CareNeedDAO("test")

describe('CareNeed', function() {
  describe('test', function() {
    it('should save a care need', function(done) {
      this.timeout(10000)
      var now = Date.now();
      careNeedDao.save(careNeed).then((savedCareNeed) => {
        assert.ok(savedCareNeed.id);
        assert.equal(savedCareNeed.parentId, "1234");
        assert.deepEqual(savedCareNeed.kids, careNeed.kids);
        assert.equal(savedCareNeed.startDateTimeOfNeed, careNeed.startDateTimeOfNeed);
        assert.equal(savedCareNeed.endDateTimeOfNeed, careNeed.endDateTimeOfNeed);
        assert.equal(savedCareNeed.careLocations, careNeed.careLocations);
        assert.ok(!savedCareNeed.otherNeighborhood);
        assert.equal(savedCareNeed.neighborhood, Neighborhood.NORTH_OAKLAND.name);
        careNeedDao.delete(savedCareNeed).then(res => done()).catch((err) => done(err))
        done()
      }).catch(err => done(err))
    });
  });
});
