

class User {
  constructor(
    id,
    first_name,
    last_name,
    phone,
    kind,
    active,
    ak_access_token,
    ak_user_id,
    ak_token_refresh_interval_sec,
    ak_token_last_renewed_timestamp,
    last_login_timestamp,
    created_on_timestamp,
    member_since_timestamp,
    profilePhotoUrl
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
    this.kind = kind;
    this.active = active;
    this.ak_access_token = ak_access_token;
    this.ak_user_id = ak_user_id;
    this.ak_token_refresh_interval_sec = ak_token_refresh_interval_sec;
    this.ak_token_last_renewed_timestamp = ak_token_last_renewed_timestamp;
    this.last_login_timestamp = last_login_timestamp;
    this.created_on_timestamp = created_on_timestamp;
    this.member_since_timestamp = member_since_timestamp;
    this.profilePhotoUrl = profilePhotoUrl;
  }

  toString() {
    return `
      ${this.constructor}\n
      id\t${this.id}\n
      first name\t${this.first_name}\n
      last name\t${this.last_name}\n
      phone\t${this.phone}\n
      kind\t${this.kind}\n
      active\t${this.active}\n
      ak_access_token\t${this.ak_access_token}\n
      ak_user_id\t${this.ak_user_id}\n
      ak_token_refresh_interval_sec\t${this.ak_token_refresh_interval_sec}\n
      ak_token_last_renewed_timestamp\t${this.ak_token_last_renewed_timestamp}\n
      last_login_timestamp\t${this.last_login_timestamp}\n
      created_on_timestamp\t${this.created_on_timestamp}\n
      member_since_timestamp\t${this.member_since_timestamp}\n
      profilePhotoUrl\t${this.profilePhotoUrl}\n
    `
  }
}

module.exports = User
