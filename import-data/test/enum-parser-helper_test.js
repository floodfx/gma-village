var assert = require('assert');
var EnumParserHelper = require('../src/enum-parser-helper')
var CareAgesHelper = require('../src/care-ages-helper')
var CareLocationsHelper = require('../src/care-locations-helper')
var DemeanorsHelper = require('../src/demeanors-helper')
var {
  Availability,
  CareAge,
  CareLocation,
  Demeanor
} = require('gma-village-data-model')

describe('EnumParserHelper for Availability', function() {
  describe('parseAll', function() {
    it('should parse valid using enum parser helper clean values', function() {
      var input = "Daytime, Evening, Overnight"
      var values = EnumParserHelper.parseAll(input, Availability)
      assert.equal(values.length, 3);
      assert.ok(values.includes(Availability.DAYTIME))
      assert.ok(values.includes(Availability.EVENING))
      assert.ok(values.includes(Availability.OVERNIGHT))
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
      assert.ok(values.includes(CareAge.SIX_MONTHS_TO_TWO_YEARS))
      assert.ok(values.includes(CareAge.TWO_YEARS_TO_FIVE_YEARS))
      assert.ok(values.includes(CareAge.FIVE_YEARS_PLUS))
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
      assert.ok(values.includes(CareLocation.PROVIDERS_HOME))
    });
    it('should parse "Im Flexible" values', function() {
      var input = "I'm flexible"
      var values = EnumParserHelper.parseAll(input, CareLocation, CareLocationsHelper.VALID_VALUES_MAP)
      assert.equal(values.length, 2);
      assert.ok(values.includes(CareLocation.CHILDS_HOME))
      assert.ok(values.includes(CareLocation.PROVIDERS_HOME))
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
      assert.equal(values.valids.length, 6);
      assert.equal(values.invalids.length, 1);
      assert.ok(values.valids.includes(Demeanor.PATIENT))
      assert.ok(values.valids.includes(Demeanor.CALM))
      assert.ok(values.valids.includes(Demeanor.FUNNY))
      assert.ok(values.valids.includes(Demeanor.RELIABLE))
      assert.ok(values.valids.includes(Demeanor.QUIET))
      assert.ok(values.valids.includes(Demeanor.PLAYFUL))
      assert.ok(values.invalids.includes('Honest'))
    });
  });
});
