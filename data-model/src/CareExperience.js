var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class CareExperience extends EnumWithParser {}
CareExperience.initEnum({
  'RAISED_KIDS': {
      get text() { return "Raised Kids" },
  },
  'CARED_FOR_GRANDKIDS': {
      get text() { return "Cared for Grandkids" },
  },
  'WORKED_BABYSITTING': {
      get text() { return "Worked Baby-sitting" },
  },
  'WORKED_CHILDCARE_CENTER': {
      get text() { return "Worked at Childcare Center" },
  },
  'WORKED_SCHOOL': {
      get text() { return "Worked at School" },
  }
});

module.exports = CareExperience
