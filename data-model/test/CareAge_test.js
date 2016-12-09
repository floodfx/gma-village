var assert = require('assert');
var { CareAge } = require("../lib/index")

describe('CareAge', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(CareAge.parse("zero to six months"), CareAge.ZERO_TO_SIX_MONTHS);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => CareAge.parse("6 plus"));
    });
  });
});
