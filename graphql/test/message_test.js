var assert = require('assert');
var { 
  ageFromBirthday, 
  formatDate,
  formatPhone,
  formatNeighborhood,
  buildMessage,
  kidsCount,
  kidsAges
} = require('../src/careNeed/message');
var moment = require('moment');
var { Neighborhood } = require('gma-village-data-model');

describe('CareNeed', function() {
  describe('ageFromBirthday', function() {
    it('should round ages', function() {
      var lessThanYear = moment().subtract(7, 'months').unix();
      var ageInfo = ageFromBirthday(lessThanYear)
      assert.equal(ageInfo.text, "7 mos old")

      var yearPlus = moment().subtract(1, 'year').subtract(3, 'months').unix()
      ageInfo = ageFromBirthday(yearPlus)
      assert.equal(ageInfo.text, "1 yr old")

      var almost2 = moment().subtract(1, 'year').subtract(10, 'months').unix()
      ageInfo = ageFromBirthday(almost2)
      assert.equal(ageInfo.text, "2 yrs old")

      var twoPoint25 = moment().subtract(2, 'year').subtract(3, 'months').unix()
      ageInfo = ageFromBirthday(twoPoint25)
      assert.equal(ageInfo.text, "2 yrs old")

      var twoPoint5ish = moment().subtract(2, 'year').subtract(4, 'months').unix()
      ageInfo = ageFromBirthday(twoPoint5ish)
      assert.equal(ageInfo.text, "2 1/2 yrs old")

      var twoPoint5ish2 = moment().subtract(2, 'year').subtract(8, 'months').unix()
      ageInfo = ageFromBirthday(twoPoint5ish2)
      assert.equal(ageInfo.text, "2 1/2 yrs old")

      var almost3 = moment().subtract(2, 'year').subtract(10, 'months').unix()
      ageInfo = ageFromBirthday(almost3)
      assert.equal(ageInfo.text, "3 yrs old")

      var almost3 = moment().subtract(3, 'year').subtract(1, 'months').unix()
      ageInfo = ageFromBirthday(almost3)
      assert.equal(ageInfo.text, "3 yrs old")

      var five = moment().subtract(5, 'years').unix()
      ageInfo = ageFromBirthday(five)
      assert.equal(ageInfo.text, "5 yrs old")

      var fivePt5 = moment().subtract(5, 'years').subtract('6', 'months').unix()
      ageInfo = ageFromBirthday(fivePt5)
      assert.equal(ageInfo.text, "5 yrs old")

      var almost6 = moment().subtract(5, 'years').subtract('11', 'months').unix()
      ageInfo = ageFromBirthday(almost6)
      assert.equal(ageInfo.text, "5 yrs old")

      var six = moment().subtract(6, 'years').subtract('4', 'months').unix()
      ageInfo = ageFromBirthday(six)
      assert.equal(ageInfo.text, "6 yrs old")
    })
  })
})

describe('CareNeed', function() {
  describe('formatPhone', function() {
    it('format phone', function() {
      var phone = "4441112222";
      var formattedPhone = formatPhone(phone)
      assert.equal(formattedPhone, "444-111-2222")
      phone = "123-444-1133"
      formattedPhone = formatPhone(phone)
      assert.equal(formattedPhone, "123-444-1133")
    })
  })
})

describe('CareNeed', function() {
  describe('kidsCount', function() {
    it('formats correctly', function() {
      var kids = [
        {birthday: 1}
      ]  
      var kc = kidsCount(kids);    
      assert.equal(kc, "1 kid")
      kids.push({birthday: 2})
      kc = kidsCount(kids);    
      assert.equal(kc, "2 kids")
    })
  })
})

describe('CareNeed', function() {
  describe('message', function() {
    it('should be', function() {
      var parent = {
        first_name: "Donnie",
        phone: "4441113333"
      }
      var kids = [
        {birthday: moment().subtract(1, 'year').subtract(10, 'months').unix()},
        {birthday: moment().subtract(3, 'year').subtract(10, 'months').unix()}
      ]
      var neighborhood = Neighborhood.NORTH_OAKLAND.name;
      var otherNeighborhood = "";
      var startDateTimeOfNeed = moment().add(1, 'day').add(3, 'hours').unix()
      var endDateTimeOfNeed = moment().add(1, 'day').add(7, 'hours').unix()
      var targetMessage = `Gma Village Parent ${parent.first_name} `+
        `needs care for ${kidsCount(kids)} (${kidsAges(kids)}) in `+
        `${formatNeighborhood(neighborhood, otherNeighborhood)} `+
        `on ${formatDate(startDateTimeOfNeed, "MMM Do, h:mma")}` +
        `-${formatDate(endDateTimeOfNeed, "h:mma")}. `+
        `Text ${formatPhone(parent.phone)} to setup interview.`
      var builtMessage = buildMessage(parent, kids, neighborhood, "", startDateTimeOfNeed, endDateTimeOfNeed);
      assert.equal(targetMessage, builtMessage)
    })
  })
})

