var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class Demeanor extends EnumWithParser {}
Demeanor.initEnum([
  'PATIENT',
  'OUTGOING',
  'CALM',
  'FUNNY',
  'RELIABLE',
  'SERIOUS',
  'ENERGETIC',
  'QUIET',
  'PLAYFUL',
  'LOUD'
]);

module.exports = Demeanor
