var assert = require('assert');
var { CareTraining } = require("../lib/index")

describe('CareTraining', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(CareTraining.parse("health and safety"), CareTraining.HEALTH_AND_SAFETY);
    });
    it('should parse ampersand (&) into AND then into enums', function() {
      assert.equal(CareTraining.parse("CPR & First Aid"), CareTraining.CPR_AND_FIRST_AID);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => CareTraining.parse("something else"));
    });
    it('should have text prop', function() {
      assert.equal(CareTraining.CPR_AND_FIRST_AID.text, "CPR and First Aid")
    });
  });
});
