var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class CareTraining extends EnumWithParser {}
CareTraining.initEnum({
  'HEALTH_AND_SAFETY': {
      get text() { return "Health and Safety" },
  },
  'CPR_AND_FIRST_AID': {
      get text() { return "CPR and First Aid" },
  },
  'PREVENTATIVE_HEALTH': {
      get text() { return "Preventative Health" },
  },
  'CHILDCENTERED_ART': {
      get text() { return "Child-centered Art" },
  }
});

module.exports = CareTraining
