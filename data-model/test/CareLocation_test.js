var assert = require('assert');
var CareLocation = require("../lib/CareLocation")

describe('CareLocation', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(CareLocation.parse("childs home"), CareLocation.CHILDS_HOME);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => CareLocation.parse("something else"));
    });
  });
});
