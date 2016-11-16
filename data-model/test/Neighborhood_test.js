var assert = require('assert');
var Neighborhood = require("../lib/Neighborhood")

describe('Neighborhood', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(Neighborhood.parse("west oakland"), Neighborhood.WEST_OAKLAND);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => Neighborhood.parse("something"));
    });
  });
});
