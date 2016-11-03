var assert = require('assert');
var Availability = require("../src/Availability")

describe('Availability', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(Availability.parse("Daytime"), Availability.DAYTIME);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => Availability.parse("Not Daytime"));
    });
  });
});
