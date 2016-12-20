var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser")

class Availability extends EnumWithParser { }
Availability.initEnum({
  'EARLY_MORNING': {
    get text() { return "Early Morning" },
  },
  'DAYTIME': {
    get text() { return "Daytime" },
  },
  'EVENING': {
    get text() { return "Evening" },
  },
  'OVERNIGHT': {
    get text() { return "Overnight" },
  },
  'WEEKEND': {
    get text() { return "Weekend" },
  },
  'OTHER': {
    get text() { return "Other" },
  }
})

module.exports = Availability
