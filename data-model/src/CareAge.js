var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class CareAge extends EnumWithParser {}
CareAge.initEnum([
  'ZERO_TO_SIX_MONTHS',
  'SIX_MONTHS_TO_TWO_YEARS',
  'TWO_YEARS_TO_FIVE_YEARS',
  'FIVE_YEARS_PLUS'
]);

module.exports = CareAge
