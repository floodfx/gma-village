import { ageFromBirthday } from '../src/components/formatutil';
import assert from 'assert';
import moment from 'moment';

describe('ageFromBirthday', () => {
  describe('test', () => {
    it('should return proper years, months for less than a year', () => {
      var lessThanAYearBday = moment().add(8, 'months').add(10, 'days').unix();
      assert.deepEqual(ageFromBirthday(lessThanAYearBday), { years: 0, months: 8, text: "8 months old"});
    })
    it('should return proper years, months for more than than a year', () => {
      var bday = moment().add(1, 'year').add(2.5, 'months').unix();
      assert.deepEqual(ageFromBirthday(bday), { years: 1, months: 2, text: "1 year, 2 months old"});
    })
    it('should return proper years, months for exactly years', () => {
      var bday = moment().add(2.1, 'year').unix();
      assert.deepEqual(ageFromBirthday(bday), { years: 2, months: 0, text: "2 years old"});
    })
  })
})
