var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class Role extends EnumWithParser {}
Role.initEnum([
  'ADMIN'
]);

module.exports = Role
