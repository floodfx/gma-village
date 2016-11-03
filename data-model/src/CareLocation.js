var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class CareLocation extends EnumWithParser {}
CareLocation.initEnum([
  'CHILDS_HOME',
  'PROVIDERS_HOME'
]);

module.exports = CareLocation
