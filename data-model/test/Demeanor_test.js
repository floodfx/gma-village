var assert = require('assert');
var { Demeanor } = require("../lib/index")

describe('Demeanor', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(Demeanor.parse("patient"), Demeanor.PATIENT);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => Demeanor.parse("soemthing else"));
    });
    it('should have text prop', function() {
      assert.equal(Demeanor.PATIENT.text, "Patient")
    });
  });
});
