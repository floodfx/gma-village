var {Enum} = require("enumify");

class EnumWithParser extends Enum {
  static parse(input) {
    var data = input.replace(/\s/g, "_").toUpperCase()
    var match = this.enumValueOf(data);
    if(match) {
      return match
    } else {

      // TODO parse further?
      throw `Unable to parse input for ${this.name}. Input: '${match}'`
    }
  }
}

module.exports = EnumWithParser
