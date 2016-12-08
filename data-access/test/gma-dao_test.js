var assert = require('assert');
var GmaDAO = require("../src/google-datastore/gma-dao.js")
var UserDAO = require("../src/google-datastore/user-dao.js")
var { Gma, User } = require('gma-village-data-model')

var u = new User(null, "a", "b", "5551112222", "kind", "kind_id", true,
            "ak_token", "ak_uid", 1, 12345678, 12345679, 12345680, 12345681)

describe('GmaDAO', function() {
  describe('test', function() {
    it('should save Gma and User pointing at Gma then clean up', function(done) {
      this.timeout(10000)
      var gma = new Gma(null, "fn", "ln", "5551112222")
      new GmaDAO("test").save(gma).then((savedGma) => {
        u.kind = "Gma"
        u.kind_id = savedGma.id
        new UserDAO("test").save(u).then((user) => {
          assert.ok(user.id)
          assert.equal(user.kind, "Gma")
          assert.equal(user.kind_id, savedGma.id)
          new GmaDAO("test").get(savedGma.id).then((foundGma) => {
            new GmaDAO("test").delete(foundGma).then((res) => {
              new UserDAO("test").deleteUser(u).then(res => done()).catch((err) => done(err))
            }).catch((err) => done(err))
          }).catch(err => done(err))

        }).catch(err => done(err))
      })

    });
  });
});
