var assert = require('assert');
var cleanName = require('../src/name-helper')

describe('name-helper', function() {
  describe('names', function() {
    it('should remove Gma prefix', function() {
      var {first_name, last_name} = cleanName("Gma Pam Barker")
      assert.equal(first_name, "Pam");
      assert.equal(last_name, "Barker");
    });
    it('should parse first name into one string and last name the remainder', function() {
      var {first_name, last_name} = cleanName("Gma Pam Mc Queen")
      assert.equal(first_name, "Pam");
      assert.equal(last_name, "Mc Queen");
    });
  });
});
