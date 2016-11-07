
class EnumParserHelper {

  static parseAll(input, enumClass, additionalValidValues={}, allowInvalids=false, delimiter=', ') {
    var split = input.split(delimiter);
    // console.log("split", split)
    var invalids = [];
    var valids = split.map((value) => {
      // console.log("value", value)
      var validValue = additionalValidValues[value.trim()];
      if(validValue === undefined) {
        try {
          validValue = enumClass.parse(value);
        }catch(e) {
          if(allowInvalids) {
            invalids.push(value)
            return
          } else {
            throw e;
          }
        }
      }
      return validValue;
    });
    // flatten array and remove undefined items
    valids = valids.reduce((a, b) => {
      if(b) {
        return a.concat(b);
      } else {
        return a;
      }
    }, []);
    // return both valids and invalids if allowed
    if(allowInvalids) {
      return {valids, invalids};
    }
    return valids;
  }
}

module.exports = EnumParserHelper
