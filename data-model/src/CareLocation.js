var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class CareLocation extends EnumWithParser {}
CareLocation.initEnum({
  'CHILDS_HOME': {
      get text() { return "Child's Home" },
  },
  'PROVIDERS_HOME': {
      get text() { return "Provider's Home" },
  }
});

module.exports = CareLocation
