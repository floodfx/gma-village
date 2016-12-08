

class Admin {
  constructor(
    id,
    roles
  ) {
    this.id = id;
    this.roles = roles;
  }

  toString() {
    return `
      Admin\n
      id\t${this.id}\n
      roles\t${this.roles}\n
    `
  }
}

module.exports = Admin
