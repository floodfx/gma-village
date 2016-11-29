var assert = require('assert');
var EnumParserHelper = require('../src/enum-parser-helper')
var CareAgesHelper = require('../src/care-ages-helper')
var CareLocationsHelper = require('../src/care-locations-helper')
var DemeanorsHelper = require('../src/demeanors-helper')
var {
  Availability,
  CareAge,
  CareLocation,
  Demeanor,
  Neighborhood
} = require('gma-village-data-model')

describe('EnumParserHelper for Availability', function() {
  describe('parseAll', function() {
    it('should parse valid using enum parser helper clean values', function() {
      var input = "Daytime, Evening, Overnight"
      var values = EnumParserHelper.parseAll(input, Availability)
      assert.equal(values.length, 3);
      assert.ok(values.includes(Availability.DAYTIME.name))
      assert.ok(values.includes(Availability.EVENING.name))
      assert.ok(values.includes(Availability.OVERNIGHT.name))
    });
    it('should throw error for invalid value', function() {
      var invalid_input = "Crack of Dawn, Daytime, Evening, Overnight"
      assert.throws(() => EnumParserHelper.parseAll(invalid_input, Availability));
    });
  });
});


describe('EnumParserHelper for CareAges', function() {
  describe('parseAll', function() {
    it('should parse all clean values', function() {
      var input = "6 months - 2 years, 3 years - 5 years, 6+ years"
      var values = EnumParserHelper.parseAll(input, CareAge, CareAgesHelper.VALID_VALUES_MAP)
      assert.equal(values.length, 3);
      assert.ok(values.includes(CareAge.SIX_MONTHS_TO_TWO_YEARS.name))
      assert.ok(values.includes(CareAge.TWO_YEARS_TO_FIVE_YEARS.name))
      assert.ok(values.includes(CareAge.FIVE_YEARS_PLUS.name))
    });
    it('should throw error for invalid value', function() {
      var invalid_input = "zero months - 2 years, 3 years - 5 years, 6+ years"
      assert.throws(() => EnumParserHelper.parseAll(invalid_input, CareAge));
    });
  });
});

describe('EnumParserHelper for CareLocations', function() {
  describe('parseAll', function() {
    it('should parse all clean values', function() {
      var input = "The provider's home"
      var values = EnumParserHelper.parseAll(input, CareLocation, CareLocationsHelper.VALID_VALUES_MAP)
      assert.equal(values.length, 1);
      assert.ok(values.includes(CareLocation.PROVIDERS_HOME.name))
    });
    it('should parse "Im Flexible" values', function() {
      var input = "I'm flexible"
      var values = EnumParserHelper.parseAll(input, CareLocation, CareLocationsHelper.VALID_VALUES_MAP)
      assert.equal(values.length, 2);
      assert.ok(values.includes(CareLocation.CHILDS_HOME.name))
      assert.ok(values.includes(CareLocation.PROVIDERS_HOME.name))
    });
    it('should throw error for invalid value', function() {
      var invalid_input = "something else"
      assert.throws(() => EnumParserHelper.parseAll(invalid_input, CareLocation));
    });
  });
});

describe('EnumParserHelper for Demeanor', function() {
  describe('parseAll', function() {
    it('should parse all clean values', function() {
      var input = "Patient, Calm, Funny, Reliable, Quite, Playful, Honest"
      var values = EnumParserHelper.parseAll(input, Demeanor, DemeanorsHelper.VALID_VALUES_MAP, true)
      console.log(values)
      assert.equal(values.values.length, 6);
      assert.equal(values.others.length, 1);
      assert.ok(values.values.includes(Demeanor.PATIENT.name))
      assert.ok(values.values.includes(Demeanor.CALM.name))
      assert.ok(values.values.includes(Demeanor.FUNNY.name))
      assert.ok(values.values.includes(Demeanor.RELIABLE.name))
      assert.ok(values.values.includes(Demeanor.QUIET.name))
      assert.ok(values.values.includes(Demeanor.PLAYFUL.name))
      assert.ok(values.others.includes('Honest'))
    });
  });
});

describe('EnumParserHelper for Neighborhood', function() {
  describe('parseAll valid', function() {
    it('should parse all clean values', function() {
      var input = "North Oakland"
      var values = EnumParserHelper.parseAll(input, Neighborhood, {}, true)
      assert.equal(values.values.length, 1);
      assert.equal(values.others.length, 0);
      assert.ok(values.values.includes(Neighborhood.NORTH_OAKLAND.name))
    });
  });

});
