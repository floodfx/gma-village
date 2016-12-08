var Datastore = require('@google-cloud/datastore');

class BaseDAO {

  constructor(kind, namespace=null, projectId = "gma-village") {
    this.kind = kind
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
          resolve(this._buildEntity(key.id, data));
        }
      });
    });
  }

  list(limit=10, nextToken) {
    return new Promise((resolve, reject) => {
      var q = this.db.createQuery([this.kind])
      this.db.runQuery(q, (err, entities, nextQuery) => {
        if (err) {
          reject(err);
        }
        var nextToken = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
        var list = entities.map((entity) => {
          // console.log("entity", entity)
          return this._buildEntity(entity[this.db.KEY].id, entity)
        })
        resolve({list, nextToken});
      });
    });
  }

  save(entity) {
    return new Promise((resolve, reject) => {
      var key;
      if (entity.id) {
        key = this.db.key([this.kind, entity.id]);
      } else {
        key = this.db.key(this.kind);
      }
      var data = [];
      Object.keys(entity).forEach(function (k) {
        if (entity[k] === undefined) {
          return;
        }
        data.push({
          name: k,
          value: entity[k]
        });
      });
      var object = {
        key: key,
        data: data
      }
      this.db.save(object, (err) => {
        if(err) {
          reject(err)
        } else {
          entity.id = key.id
          resolve(entity);
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

  _buildEntity(id, data) {
    throw "Implement this to build your entity"
  }

}

module.exports = BaseDAO
