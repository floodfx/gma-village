var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class CareExperience extends EnumWithParser {}
CareExperience.initEnum([
  'RAISED_KIDS',
  'CARED_FOR_GRANDKIDS',
  'WORKED_BABYSITTING',
  'WORKED_CHILDCARE_CENTER',
  'WORKED_SCHOOL'
]);

module.exports = CareExperience
