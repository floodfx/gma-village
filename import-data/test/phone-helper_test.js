var assert = require('assert');
var PhoneHelper = require('../src/phone-helper')

describe('PhoneHelper', function() {
  describe('parse', function() {
    it('should replace digest or white space with empty char', function() {
      assert.equal(PhoneHelper.parse("(415) 702-7236"), "4157027236");
      assert.equal(PhoneHelper.parse("415.702.7236"), "4157027236");
    });
  });
});
