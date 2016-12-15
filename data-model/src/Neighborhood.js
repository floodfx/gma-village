var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

//TODO consider supporting neighborhoods by regions at some point

class Neighborhood extends EnumWithParser {}
Neighborhood.initEnum({
  'WEST_OAKLAND': {
      get text() { return "West Oakland" },
  },
  'EAST_OAKLAND': {
      get text() { return "East Oakland" },
  },
  'CENTRAL_OAKLAND': {
      get text() { return "Central Oakland" },
  },
  'BERKELEY': {
      get text() { return "Berkeley" },
  },
  'EMERYVILLE': {
      get text() { return "Emeryville" },
  },
  'PIEDMONT': {
      get text() { return "Piedmont" },
  },
  'ALBANY': {
      get text() { return "Albany" },
  },
  'ALAMEDA': {
      get text() { return "Alameda" },
  },
  'CASTRO_VALLEY': {
      get text() { return "Castro Valley" },
  },
  'NORTH_OAKLAND': {
      get text() { return "North Oakland" },
  }
});

module.exports = Neighborhood
