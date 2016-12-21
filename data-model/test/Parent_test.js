var assert = require('assert');
var {Parent, Neighborhood} = require('../lib/index')

describe('Parent', function() {
  describe('constructor', function() {
    it('should work', function() {
      var p = new Parent(
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
        Neighborhood.OTHER.name,
        "South Berkeley",
        [
          {first_name: "Raili", birthday:1380758400},
          {first_name: "Rowen", birthday:1461456000}
        ]
      )
      assert.equal(p.id, "id");
      assert.equal(p.first_name, "fn");
      assert.equal(p.last_name, "ln");
      assert.equal(p.phone, "ph");
      assert.equal(p.kind, "Parent");
      assert.ok(p.active);
      assert.equal(p.ak_access_token, "ak_token");
      assert.equal(p.ak_user_id, "ak_uid");
      assert.equal(p.ak_token_refresh_interval_sec, 1);
      assert.equal(p.ak_token_last_renewed_timestamp, 12);
      assert.equal(p.last_login_timestamp, 123);
      assert.equal(p.created_on_timestamp, 1234);
      assert.equal(p.member_since_timestamp, 12345);
      assert.equal(p.profilePhotoUrl, "profilePhotoUrl")
      assert.equal(p.neighborhood, Neighborhood.OTHER.name)
      assert.equal(p.otherNeighborhood, "South Berkeley")
      assert.deepEqual(p.kids, [
          {first_name: "Raili", birthday:1380758400},
          {first_name: "Rowen", birthday:1461456000}
        ])
    });
  });
});
