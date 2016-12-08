var Datastore = require('@google-cloud/datastore');
var { Gma } = require('gma-village-data-model')
var BaseDAO = require('./base-dao')

class GmaDAO extends BaseDAO {

  constructor(namespace=null, projectId = "gma-village") {
    super("Gma", namespace, projectId)
  }

  gma(id) {
    return this.get(id)
  }

  gmaByPhone(phone) {
    return new Promise((resolve, reject) => {
      var q = this.db.createQuery([this.kind])
        .filter("phone", "=", phone)
      this.db.runQuery(q, (err, entities, nextQuery) => {
        // console.log("results of find by phone", err, entities, nextQuery)
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

  gmas(limit=10, nextToken) {
    return this.list(limit, nextToken);
  }

  saveGma(gma) {
    return this.save(gma);
  }

  deleteGma(gma) {
    return this.delete(gma);
  }

  _buildEntity(id, data) {
    return new Gma(
      id,
      data.first_name,
      data.last_name,
      data.phone,
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

module.exports = GmaDAO
