var User = require('./User')

class Parent extends User {
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
    member_since_timestamp
  ) {
    super(
      id,
      first_name,
      last_name,
      phone,
      "Parent",
      active,
      ak_access_token,
      ak_user_id,
      ak_token_refresh_interval_sec,
      ak_token_last_renewed_timestamp,
      last_login_timestamp,
      created_on_timestamp,
      member_since_timestamp
    )
  }

  toString() {
    return `
      Parent\n
      ${super.toString()}
    `
  }
}

module.exports = Parent
