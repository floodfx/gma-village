var assert = require('assert');
var NameHelper = require('../src/name-helper')

describe('NameHelper', function() {
  describe('parse', function() {
    it('should remove Gma prefix', function() {
      var {first_name, last_name} = NameHelper.parse("Gma Pam Barker")
      assert.equal(first_name, "Pam");
      assert.equal(last_name, "Barker");
    });
    it('should parse first name into one string and last name the remainder', function() {
      var {first_name, last_name} = NameHelper.parse("Gma Pam Mc Queen")
      assert.equal(first_name, "Pam");
      assert.equal(last_name, "Mc Queen");
    });
  });
});
