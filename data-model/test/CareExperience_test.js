var assert = require('assert');
var CareExperience = require("../lib/CareExperience")

describe('CareExperience', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(CareExperience.parse("raised kids"), CareExperience.RAISED_KIDS);
    });
    it('should parse baby-sitting (with dash) into enums', function() {
      assert.equal(CareExperience.parse("worked Baby-sitting"), CareExperience.WORKED_BABYSITTING);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => CareExperience.parse("didn't raise kids"));
    });
  });
});
