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
          if(data) {
            resolve(this._buildEntity(key.id, data));
          } else {
            reject("Entity not found")
          }
        }
      });
    });
  }

  list(userType=undefined, limit=100, nextToken) {
    return new Promise((resolve, reject) => {
      var q = this.db.createQuery([this.kind])
      q.limit(limit)
      if(userType) {
        q.filter('kind', userType)
      }
      this.db.runQuery(q, (err, entities, nextQuery) => {
        if (err) {
          reject(err);
        }
        var nextToken = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
        var list = entities.map((entity) => {
          return this._buildEntity(entity.id, entity)
        })
        resolve({list, nextToken});
      });
    });
  }

  save(user) {
    return new Promise((resolve, reject) => {
      var key;
      if (user.id) {
        key = this.db.key([this.kind, user.id]);
      } else {
        key = this.db.key([this.kind]);
      }
      var data = [];
      Object.keys(user).forEach(function (k) {
        if (user[k] === undefined) {
          return;
        }
        data.push({
          name: k,
          value: user[k]
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
          resolve(this._buildEntity(entity.key.id, user));
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
