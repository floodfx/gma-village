var Datastore = require('@google-cloud/datastore');
var BaseDAO = require('./base-dao')
var { Admin } = require('gma-village-data-model')

class AdminDAO extends BaseDAO {

  constructor(namespace=null, projectId = "gma-village") {
    super("Admin", namespace, projectId)
  }

  _buildEntity(id, data) {
    return new Admin(
      id,
      data.roles
    )
  }

}

module.exports = AdminDAO
