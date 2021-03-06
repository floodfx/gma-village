var assert = require('assert');
var { CareLocation } = require("../lib/index")

describe('CareLocation', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(CareLocation.parse("childs home"), CareLocation.CHILDS_HOME);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => CareLocation.parse("something else"));
    });
    it('should have text prop', function() {
      assert.equal(CareLocation.CHILDS_HOME.text, "Child's Home")
    });
  });
});
