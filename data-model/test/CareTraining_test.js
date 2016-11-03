var assert = require('assert');
var CareTraining = require("../src/CareTraining")

describe('CareTraining', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(CareTraining.parse("health and safety"), CareTraining.HEALTH_AND_SAFETY);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => CareTraining.parse("something else"));
    });
  });
});
