var assert = require('assert');
var {User, Parent, Gma} = require('../lib/index')

describe('User', function() {
  describe('constructor', function() {
    it('should work', function() {
      var u = new User(
        "id",
        "fn",
        "ln",
        "ph",
        "kind",
        true,
        "ak_token",
        "ak_uid",
        1,
        12,
        123,
        1234,
        12345
      )
      assert.equal(u.id, "id");
      assert.equal(u.first_name, "fn");
      assert.equal(u.last_name, "ln");
      assert.equal(u.phone, "ph");
      assert.equal(u.kind, "kind");
      assert.ok(u.active);
      assert.equal(u.ak_access_token, "ak_token");
      assert.equal(u.ak_user_id, "ak_uid");
      assert.equal(u.ak_token_refresh_interval_sec, 1);
      assert.equal(u.ak_token_last_renewed_timestamp, 12);
      assert.equal(u.last_login_timestamp, 123);
      assert.equal(u.created_on_timestamp, 1234);
      assert.equal(u.member_since_timestamp, 12345);
    });
  });
});
