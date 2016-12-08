var assert = require('assert');
var AdminDAO = require("../src/google-datastore/admin-dao.js")
var UserDAO = require("../src/google-datastore/user-dao.js")
var { User, Admin } = require('gma-village-data-model')

var u = new User(null, "a", "b", "5551112222", "kind", "kind_id", true,
            "ak_token", "ak_uid", 1, 12345678, 12345679, 12345680, 12345681)

describe('AdminDAO', function() {
  describe('test', function() {
    it('should save Admin and User pointing at Admin then clean up', function(done) {
      this.timeout(10000)
      var admin = new Admin(null, ["Admin"])
      new AdminDAO("test").save(admin).then((savedAdmin) => {
        u.kind = "Admin"
        u.kind_id = savedAdmin.id
        new UserDAO("test").save(u).then((user) => {
          assert.ok(user.id)
          assert.equal(user.kind, "Admin")
          assert.equal(user.kind_id, savedAdmin.id)
          new AdminDAO("test").get(savedAdmin.id).then((foundAdmin) => {
            new AdminDAO("test").delete(foundAdmin).then((res) => {
              new UserDAO("test").deleteUser(u).then(res => done()).catch((err) => done(err))
            }).catch((err) => done(err))
          }).catch(err => done(err))

        }).catch(err => done(err))
      })

    });
  });
});
