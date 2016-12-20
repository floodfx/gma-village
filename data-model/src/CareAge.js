var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class CareAge extends EnumWithParser { }
CareAge.initEnum({
  'ZERO_TO_SIX_MONTHS': {
    get text() { return "0-6 months" },
  },
  'SIX_MONTHS_TO_TWO_YEARS': {
    get text() { return "7 months to 2 years" },
  },
  'TWO_YEARS_TO_FIVE_YEARS': {
    get text() { return "3 years to 5 years" },
  },
  'FIVE_YEARS_PLUS': {
    get text() { return "6+ years" },
  }
});

module.exports = CareAge
