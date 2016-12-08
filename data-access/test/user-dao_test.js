var assert = require('assert');
var { GmaDAO, UserDAO } = require("../index")
var { Gma, User } = require('gma-village-data-model')

var u = new User(null, "a", "b", "5551112222", "kind", "kind_id", true,
            "ak_token", "ak_uid", 1, 12345678, 12345679, 12345680, 12345681)

describe('UserDAO', function() {
  describe('test', function() {
    it('should save and delete a user', function(done) {
      this.timeout(10000)
      new UserDAO("test").saveUser(u).then((user) => {
        assert.ok(user.id)
        assert.equal("a", user.first_name)
        assert.equal("b", user.last_name)
        assert.equal("5551112222", user.phone)
        assert.equal("kind", user.kind)
        assert.equal("kind_id", user.kind_id)
        assert.ok(user.active)
        assert.equal("ak_token", user.ak_access_token)
        assert.equal("ak_uid", user.ak_user_id)
        assert.equal(1, user.ak_token_refresh_interval_sec)
        assert.equal(12345678, user.ak_token_last_renewed_timestamp)
        assert.equal(12345679, user.last_login_timestamp)
        assert.equal(12345680, user.created_on_timestamp)
        assert.equal(12345681, user.member_since_timestamp)
        new UserDAO("test").deleteUser(u).then(res => done()).catch((err) => done(err))
      }).catch(err => done(err))
    });
    it('should save and find user then delete it', function(done) {
      this.timeout(10000)
      new UserDAO("test").saveUser(u).then((user) => {
        assert.ok(user.id)
        var id = user.id
        // find user
        new UserDAO("test").userByPhone("5551112222").then((u2) => {
          assert.equal(id, u2.id)
          new UserDAO("test").deleteUser(u).then(res => done()).catch((err) => done(err))
        }).catch(err => done(err))
      }).catch(err => done(err))
    });

  });
});
