var {Enum} = require("enumify");
var EnumWithParser = require("./EnumWithParser");

class Role extends EnumWithParser {}
Role.initEnum({
  'ADMIN': {
    get text() { return "Admin" },
  }
});

module.exports = Role
