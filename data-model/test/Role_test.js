var assert = require('assert');
var Role = require("../lib/Role")

describe('Role', function() {
  describe('enums', function() {
    it('should parse values into enums', function() {
      assert.equal(Role.parse("admin"), Role.ADMIN);
    });
    it('should throw for unparsable values', function() {
      assert.throws(() => Role.parse("soemthing else"));
    });
  });
});
