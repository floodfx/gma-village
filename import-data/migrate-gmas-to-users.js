var config = require('./src/config')
var { Gma, Role, Admin } = require('gma-village-data-model')
var { UserDAO } = require('gma-village-data-access')

var Datastore = require('@google-cloud/datastore');



class GmaDAO {

  constructor(namespace=null, projectId = "gma-village") {
    this.kind = "Gma"
    this.db = Datastore({
      projectId,
      namespace
    })
  }

  getAllGmas() {
    return new Promise((resolve, reject) => {
      var q = this.db.createQuery([this.kind])
      this.db.runQuery(q, (err, entities, nextQuery) => {
        if (err) {
          reject(err)
        }
        var nextToken = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
        var list = entities.map((entity) => {
          return this._buildGma(entity[this.db.KEY].id, entity)
        })
        resolve({list, nextToken});
      });
    });
  }

  _buildGma(id, data) {
    return new Gma(
      id,
      data.first_name,
      data.last_name,
      data.phone,
      data.active ? data.active : true,
      data.ak_access_token,
      data.ak_user_id,
      data.ak_token_refresh_interval_sec,
      data.ak_token_last_renewed_timestamp,
      data.last_login_timestamp,
      data.created_on_timestamp ? data.created_on_timestamp : Math.floor(new Date().getTime()/1000),
      data.member_since_timestamp ? data.member_since_timestamp : Math.floor(new Date().getTime()/1000),
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

var gmaDao = new GmaDAO()
gmaDao.getAllGmas().then((gmas) => {
  console.log(gmas)
  var userDao = new UserDAO("dev")
  gmas.list.forEach((gma) => {
    userDao.save(gma)
  })
})

var donnie = new Admin(
  undefined,
  "Donnie",
  "Flood",
  "4157027236",
  true,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  Math.floor(new Date().getTime()/1000),
  Math.floor(new Date().getTime()/1000),
  [Role.ADMIN.name]
)

new UserDAO("dev").save(donnie).then((d) => {
  console.log("donnie", d)
})
