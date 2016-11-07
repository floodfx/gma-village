var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class CareTraining extends EnumWithParser {}
CareTraining.initEnum([
  'HEALTH_AND_SAFETY',
  'CPR_AND_FIRST_AID',
  'PREVENTATIVE_HEALTH',
  'CHILDCENTERED_ART'
]);

module.exports = CareTraining
