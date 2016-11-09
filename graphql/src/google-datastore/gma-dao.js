var Datastore = require('@google-cloud/datastore');
var {Gma} = require('gma-village-data-model')

class GmaDAO {

  constructor(projectId = "gma-village") {
    this.kind = "Gma"
    this.db = Datastore({
      projectId
    })
  }

  gma(id) {
    console.log("fetch gma by id", id)
    return new Promise((resolve, reject) => {
      var key = this.db.key([this.kind, parseInt(id.id, 10)])
      this.db.get(key, (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(this._getGma(key.id, data));
        }
      });
    });
  }

  gmas(filter, limit=10, nextToken) {
    console.log("gmas", filter)
    return new Promise((resolve, reject) => {
      var q = this.db.createQuery([this.kind])
      // q.run((err, entities, nextQuery) => {
      //   console.log(err, entities, nextQuery)
      //   if (err) {
      //     reject(err);
      //   }
      //   var nextToken = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
      //   var gmas = entities.map((entity) => {
      //     console.log("entity", entity)
      //     console.log("entity.KEY", entity.KEY)
      //     return this._getGma(entity.key, entity)
      //   })
      //   console.log("gmas", gmas)
      //   resolve({gmas, nextToken});
      // });
        // .limit(limit)
        // .select('__key__')
        // .start(nextToken || false);
      this.db.runQuery(q, (err, entities, nextQuery) => {
        console.log(err, entities, nextQuery)
        if (err) {
          reject(err);
        }
        var nextToken = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
        var gmas = entities.map((entity) => {
          console.log("entity", entity)
          return this._getGma(entity.key.id, entity.data)
        })
        console.log("gmas", gmas)
        resolve({gmas, nextToken});
      });
    });
  }

  saveGma(input) {
    console.log("saveGma", input)
    return new Promise((resolve, reject) => {
      console.log("inside promise", input)
      var key;
      if (input.id) {
        key = this.db.key([this.kind, input.id]);
      } else {
        key = this.db.key(this.kind);
      }
      var data = [];
      Object.keys(input.input).forEach(function (k) {
        if (input.input[k] === undefined) {
          return;
        }
        data.push({
          name: k,
          value: input.input[k]
        });
      });
      var entity = {
        key: key,
        data: data
      }
      console.log("saving", entity)
      this.db.save(entity, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve(this._getGma(key.id, data));
        }
      })
    })
  }

  _getGma(id, data) {
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
