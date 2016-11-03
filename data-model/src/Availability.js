var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser")

class Availability extends EnumWithParser {}
Availability.initEnum([
  'EARLY_MORNING',
  'DAYTIME',
  'EVENING',
  'OVERNIGHT',
  'WEEKEND'
]);

module.exports = Availability
