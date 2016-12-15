var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class City extends EnumWithParser {}
City.initEnum({
  'OAKLAND': {
      get text() { return "Oakland" },
  }
});

module.exports = City
