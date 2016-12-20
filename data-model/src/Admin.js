var User = require('./User')

class Admin extends User {
  constructor(
    id,
    first_name,
    last_name,
    phone,
    active,
    ak_access_token,
    ak_user_id,
    ak_token_refresh_interval_sec,
    ak_token_last_renewed_timestamp,
    last_login_timestamp,
    created_on_timestamp,
    member_since_timestamp,    
    roles,
    profilePhotoUrl
  ) {
    super(
      id,
      first_name,
      last_name,
      phone,
      "Admin",
      active,
      ak_access_token,
      ak_user_id,
      ak_token_refresh_interval_sec,
      ak_token_last_renewed_timestamp,
      last_login_timestamp,
      created_on_timestamp,
      member_since_timestamp,
      profilePhotoUrl
    )
    this.roles = roles;
  }

  toString() {
    return `
      Admin\n
      ${super.toString()}
      roles\t${this.roles}\n
    `
  }
}

module.exports = Admin
