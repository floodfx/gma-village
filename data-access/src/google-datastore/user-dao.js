var Datastore = require('@google-cloud/datastore');
var { User, Admin, Gma, Parent } = require('gma-village-data-model')
var BaseDAO = require('./base-dao')

class UserDAO extends BaseDAO {

  constructor(namespace=null, projectId = "gma-village") {
    super("User", namespace, projectId);

    this.USER_TYPES = ["Admin", "Gma", "Parent"];
  }

  save(entity) {
    if(!this.USER_TYPES.includes(entity.kind)) {
      throw `Entity kind(${entity.kind}) not a known User Type`
    } else {
      return super.save(entity)
    }
  }

  findByPhone(phone, active=true) {
    return new Promise((resolve, reject) => {
      this.list(null, 1).then((entities) => {
        if(entities.list.length > 0) {
          var entity = entities.list[0];
          resolve(entity)
        } else {
          reject("No user found")
        }
      })
    });
  }

  _buildEntity(id, data) {
    switch(data.kind) {
      case "Admin":
      return this._buildAdmin(id, data)
      case "Gma":
      return this._buildGma(id, data)
      case "Parent":
      return this._buildParent(id, data)
      default:
      throw `Unknown user kind ${data.kind}`
    }
  }

  _buildParent(id, data) {
    return new Parent(
      id,
      data.first_name,
      data.last_name,
      data.phone,
      data.active,
      data.ak_access_token,
      data.ak_user_id,
      data.ak_token_refresh_interval_sec,
      data.ak_token_last_renewed_timestamp,
      data.last_login_timestamp,
      data.created_on_timestamp,
      data.member_since_timestamp
    )
  }

  _buildAdmin(id, data) {
    return new Admin(
      id,
      data.first_name,
      data.last_name,
      data.phone,
      data.active,
      data.ak_access_token,
      data.ak_user_id,
      data.ak_token_refresh_interval_sec,
      data.ak_token_last_renewed_timestamp,
      data.last_login_timestamp,
      data.created_on_timestamp,
      data.member_since_timestamp,
      data.roles
    )
  }

  _buildGma(id, data) {
    return new Gma(
      id,
      data.first_name,
      data.last_name,
      data.phone,
      data.active,
      data.ak_access_token,
      data.ak_user_id,
      data.ak_token_refresh_interval_sec,
      data.ak_token_last_renewed_timestamp,
      data.last_login_timestamp,
      data.created_on_timestamp,
      data.member_since_timestamp,
      data.availabilities,
      data.otherAvailability,
      data.careAges,
      data.careExperiences,
      data.otherCareExperience,
      data.careLocations,
      data.careTrainings,
      data.otherCareTraining,
      data.city,
      data.demeanors,
      data.otherDemeanor,
      data.neighborhood,
      data.otherNeighborhood,
      data.isAvailableOutsideNeighborhood,
      data.whyCareForKidsText,
      data.additionalInformationText
    )
  }

}

module.exports = UserDAO
