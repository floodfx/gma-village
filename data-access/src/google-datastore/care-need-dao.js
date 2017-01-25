var Datastore = require('@google-cloud/datastore');

class CareNeedDAO {

  constructor(namespace=null, projectId = "gma-village") {
    this.kind = "CareNeed"
    this.db = Datastore({
      projectId,
      namespace
    })
  }

  get(id) {
    return new Promise((resolve, reject) => {
      var key = this.db.key([this.kind, id])
      this.db.get(key, (err, data) => {
        if(err) {
          reject(err);
        } else {
          if(data) {
            resolve(this.buildCareNeed(key.id, data));
          } else {
            reject("Entity not found")
          }
        }
      });
    });
  }

  list(limit=100, nextToken) {
    return new Promise((resolve, reject) => {
      var q = this.db.createQuery([this.kind])      
      q.limit(limit)
      this.db.runQuery(q, (err, entities, nextQuery) => {
        if (err) {
          reject(err);
        }
        var nextToken = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
        var list = entities.map((entity) => {
          return this.buildCareNeed(entity[this.db.KEY].id, entity)
        })
        resolve({list, nextToken});
      });
    });
  }

  save(careNeed) {
    return new Promise((resolve, reject) => {
      var key;
      if (careNeed.id) {
        key = this.db.key([this.kind, parseInt(careNeed.id)]);
      } else {
        key = this.db.key([this.kind]);
      }
      var data = [];
      Object.keys(careNeed).forEach(function (k) {
        if (careNeed[k] === undefined) {
          return;
        }
        data.push({
          name: k,
          value: careNeed[k]
        });
      });
      var entity = {
        key: key,
        data: data
      }
      this.db.save(entity, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve(this.buildCareNeed(entity.key.id, careNeed));
        }
      })
    })
  }

  delete(entity) {
    return new Promise((resolve, reject) => {
      var key = this.db.key([this.kind, entity.id]);
      this.db.delete(key, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve();
        }
      })
    })
  }

  buildCareNeed(id, data) {
    return {
      id,
      parentId: data.parentId,
      neighborhood: data.neighborhood,
      otherNeighborhood: data.otherNeighborhood,
      careLocations: data.careLocations,
      startDateTimeOfNeed: data.startDateTimeOfNeed,
      endDateTimeOfNeed: data.endDateTimeOfNeed,
      kids: data.kids,
      gmas: data.gmas
    }
  }

}

module.exports = CareNeedDAO
