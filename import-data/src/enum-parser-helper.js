
class EnumParserHelper {

  static parseAll(input, enumClass, additionalValidValues={}, allowOthers=false, delimiter=', ') {
    var split = input.split(delimiter);
    // console.log("split", split)
    var others = [];
    var values = split.map((value) => {
      // console.log("value", value)
      var validValue = additionalValidValues[value.trim()];
      if(validValue === undefined) {
        try {
          validValue = enumClass.parse(value);
        }catch(e) {
          if(allowOthers) {
            others.push(value)
            return
          } else {
            throw e;
          }
        }
      }
      return validValue;
    });
    // flatten array and remove undefined items
    values = values.reduce((a, b) => {
      if(b) {
        return a.concat(b);
      } else {
        return a;
      }
    }, []);
    var values = values.map((v) => v.name)
    // return both values and other if allowed
    if(allowOthers) {
      return {values, others};
    }
    return values;
  }
}

module.exports = EnumParserHelper
