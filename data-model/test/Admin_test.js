var assert = require('assert');
var {Admin, Role} = require('../lib/index')

describe('Admin', function() {
  describe('constructor', function() {
    it('should work', function() {
      var a = new Admin(
        "id",
        "fn",
        "ln",
        "ph",
        true,
        "ak_token",
        "ak_uid",
        1,
        12,
        123,
        1234,
        12345,
        "profilePhotoUrl",
        [Role.ADMIN.name]
      )
      assert.equal(a.id, "id");
      assert.equal(a.first_name, "fn");
      assert.equal(a.last_name, "ln");
      assert.equal(a.phone, "ph");
      assert.equal(a.kind, "Admin");
      assert.ok(a.active);
      assert.equal(a.ak_access_token, "ak_token");
      assert.equal(a.ak_user_id, "ak_uid");
      assert.equal(a.ak_token_refresh_interval_sec, 1);
      assert.equal(a.ak_token_last_renewed_timestamp, 12);
      assert.equal(a.last_login_timestamp, 123);
      assert.equal(a.created_on_timestamp, 1234);
      assert.equal(a.member_since_timestamp, 12345);      
      assert.deepEqual(a.roles, [Role.ADMIN.name])
      assert.equal(a.profilePhotoUrl, "profilePhotoUrl");
    });
  });
});
