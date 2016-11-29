var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

//TODO consider supporting neighborhoods by regions at some point

class Neighborhood extends EnumWithParser {}
Neighborhood.initEnum([
  'WEST_OAKLAND',
  'EAST_OAKLAND',
  'CENTRAL_OAKLAND',
  'BERKELEY',
  'EMERYVILLE',
  'PIEDMONT',
  'ALBANY',
  'ALAMEDA',
  'CASTRO_VALLEY',
  'NORTH_OAKLAND'
]);

module.exports = Neighborhood
