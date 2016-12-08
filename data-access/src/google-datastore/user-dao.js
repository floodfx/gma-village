var Datastore = require('@google-cloud/datastore');
var { User } = require('gma-village-data-model')
var BaseDAO = require('./base-dao')

class UserDAO extends BaseDAO {

  constructor(namespace=null, projectId = "gma-village") {
    super("User", namespace, projectId)
  }

  user(id) {
    return this.get(id);
  }

  userByPhone(phone, active=true) {
    return new Promise((resolve, reject) => {
      var q = this.db.createQuery([this.kind])
        .filter("phone", "=", phone)
        .filter("active", "=", active)
      this.db.runQuery(q, (err, entities, nextQuery) => {
        if (err) {
          reject(err);
        }
        if(entities.length !== 0) {
          var entity = entities[0];
          resolve(this._buildEntity(entity[this.db.KEY].id, entity))
        } else {
          resolve(undefined)
        }
      })
    });
  }

  saveUser(user) {
    return this.save(user);
  }

  deleteUser(user) {
    return this.delete(user);
  }

  _buildEntity(id, data) {
    return new User(
      id,
      data.first_name,
      data.last_name,
      data.phone,
      data.kind,
      data.kind_id,
      data.active,
      data.ak_access_token,
      data.ak_user_id,
      data.ak_token_refresh_interval_sec,
      data.ak_token_last_renewed_timestamp,
      data.last_login_timestamp,
      data.created_on_date,
      data.member_since_date
    )
  }

}

module.exports = UserDAO
