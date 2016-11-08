var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class City extends EnumWithParser {}
City.initEnum([
  'OAKLAND'
]);

module.exports = City
