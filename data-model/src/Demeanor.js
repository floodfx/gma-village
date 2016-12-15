var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class Demeanor extends EnumWithParser {}
Demeanor.initEnum({
  'PATIENT': {
      get text() { return "Patient" },
  },
  'OUTGOING': {
      get text() { return "Outgoing" },
  },
  'CALM': {
      get text() { return "Calm" },
  },
  'FUNNY': {
      get text() { return "Funny" },
  },
  'RELIABLE': {
      get text() { return "Reliable" },
  },
  'SERIOUS': {
      get text() { return "Serious" },
  },
  'ENERGETIC': {
      get text() { return "Energetic" },
  },
  'QUIET': {
      get text() { return "Quiet" },
  },
  'PLAYFUL': {
      get text() { return "Playful" },
  },
  'LOUD': {
      get text() { return "Loud" },
  }
});

module.exports = Demeanor
