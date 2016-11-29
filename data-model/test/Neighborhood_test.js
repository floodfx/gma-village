var assert = require('assert');
var Neighborhood = require("../lib/Neighborhood")

describe('Neighborhood', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      console.log(Neighborhood.enumValues)
      assert.equal(Neighborhood.parse("west oakland"), Neighborhood.WEST_OAKLAND);
      assert.equal(Neighborhood.parse("central oakland"), Neighborhood.CENTRAL_OAKLAND);
      assert.equal(Neighborhood.parse("north oakland"), Neighborhood.NORTH_OAKLAND);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => Neighborhood.parse("something"));
    });
  });
});
