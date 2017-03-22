var timemath = require('../timemath')

var TEST_MSG1 = 'TEST: (2 msgs) Gma Village Parent Johnna needs care for 2 kids (~3 yrs old, 9 mos old) in North Oakland on Feb 1st, 6:00pm-7:30pm. Text 415-702-7236 to setup interview.'
var TEST_MSG2 = 'TEST: (2 msgs) Gma Village Parent Johnna needs care for 2 kids (~3 yrs old, 9 mos old) in North Oakland on Feb 1st, 10:00am-11:30am. Text 415-702-7236 to setup interview.'
var TEST_MSG3 = 'TEST: (2 msgs) Gma Village Parent Johnna needs care for 2 kids (~3 yrs old, 9 mos old) in North Oakland on Feb 1st, 9:00pm-2:00am. Text 415-702-7236 to setup interview.'
var TEST_MSG4 = 'TEST: (2 msgs) Gma Village Parent Johnna needs care for 2 kids (~3 yrs old, 9 mos old) in North Oakland on Feb 1st, 1:00pm-6:00pm. Text 415-702-7236 to setup interview.'

var assert = require('assert');

describe('TimeMath', function () {
  describe('test', function () {
    it('finds times in messages', () => {
      assert.equal(timemath.correctUtcOffset(TEST_MSG1), TEST_MSG2) 
      assert.equal(timemath.correctUtcOffset(TEST_MSG3), TEST_MSG4) 
    })
  })
})