var assert = require('assert');
var CareExperience = require("../src/CareExperience")

describe('CareExperience', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(CareExperience.parse("raised kids"), CareExperience.RAISED_KIDS);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => CareExperience.parse("didn't raise kids"));
    });
  });
});
