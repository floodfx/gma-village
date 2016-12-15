var assert = require('assert');
var { Neighborhood } = require("../lib/index")

describe('Neighborhood', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(Neighborhood.parse("west oakland"), Neighborhood.WEST_OAKLAND);
      assert.equal(Neighborhood.parse("central oakland"), Neighborhood.CENTRAL_OAKLAND);
      assert.equal(Neighborhood.parse("north oakland"), Neighborhood.NORTH_OAKLAND);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => Neighborhood.parse("something"));
    });
    it('should have text prop', function() {
      assert.equal(Neighborhood.CASTRO_VALLEY.text, "Castro Valley")
    });
  });
});
