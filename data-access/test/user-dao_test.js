var assert = require('assert');
var { UserDAO } = require("../index")
var {
  Admin,
  Gma,
  Parent,
  User,
  Availability,
  CareAge,
  CareLocation,
  CareTraining,
  CareExperience,
  City,
  Demeanor,
  Neighborhood,
  Role
} = require('gma-village-data-model')

var a = new Admin(
  undefined,
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
  [Role.ADMIN.name]
)

var g = new Gma(
  undefined,
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
  [Availability.DAYTIME.name],
  ["Holidays"],
  [CareAge.ZERO_TO_SIX_MONTHS.name],
  [CareExperience.WORKED_BABYSITTING.name],
  ["Foster"],
  [CareLocation.CHILDS_HOME.name],
  [CareTraining.CPR_AND_FIRST_AID.name],
  ["Classes"],
  [City.OAKLAND.name],
  [Demeanor.PATIENT.name],
  ["Cool"],
  Neighborhood.NORTH_OAKLAND.name,
  ["Rockridge"],
  true,
  "Because they are the future",
  "Add"
)

var p = new Parent(
  undefined,
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
  12345
)

var userDao = new UserDAO("test")

describe('UserDAO', function() {
  describe('test', function() {
    it('should save and delete a user', function(done) {
      this.timeout(10000)
      userDao.save(p).then((user) => {
        assert.ok(user.id);
        assert.equal(user.first_name, "fn");
        assert.equal(user.last_name, "ln");
        assert.equal(user.phone, "ph");
        assert.equal(user.kind, "Parent");
        assert.ok(user.active);
        assert.equal(user.ak_access_token, "ak_token");
        assert.equal(user.ak_user_id, "ak_uid");
        assert.equal(user.ak_token_refresh_interval_sec, 1);
        assert.equal(user.ak_token_last_renewed_timestamp, 12);
        assert.equal(user.last_login_timestamp, 123);
        assert.equal(user.created_on_timestamp, 1234);
        assert.equal(user.member_since_timestamp, 12345);
        new UserDAO("test").delete(user).then(res => done()).catch((err) => done(err))
      }).catch(err => done(err))
    });
    it('should save and find user then delete it', function(done) {
      this.timeout(10000)
      new UserDAO("test").save(p).then((user) => {
        assert.ok(user.id)
        assert.equal(user.kind, "Parent")
        assert.equal(user.phone, "ph")
        var id = user.id
        // find user
        new UserDAO("test").findByPhone(user.phone).then((u2) => {
          assert.equal(u2.id, user.id)
          assert.equal(u2.kind, user.kind)
          assert.equal(u2.phone, user.phone)
          new UserDAO("test").delete(u2).then(res => done()).catch((err) => done(err))
        }).catch(err => done(err))
      }).catch(err => done(err))
    });

    it('should throw error when user not found', function(done) {
      this.timeout(10000)
      new UserDAO("test").get("some_id").then((user) => {
        done("shouldn't find user here")
      }).catch((err) => {
        done()
      })
    });

    it('should list users based on kind', function(done) {
      this.timeout(10000)
      new UserDAO("test").save(p).then((parent) => {
        new UserDAO("test").list("Parent").then((parents) => {
          assert.equal(parents.list.length, 1)
          new UserDAO("test").delete(parents.list[0]).then(res => done()).catch((err) => done(err))
        }).catch((err) => {
          done(err)
        })
      }).catch(err => done(err))

    });

    it('should list users based on kind and activity', function(done) {
      this.timeout(10000)
      p.active = true;
      new UserDAO("test").save(p).then((parent) => {
        new UserDAO("test").list("Parent").then((parents) => {
          assert.equal(parents.list.length, 1);
          new UserDAO("test").list("Parent", false).then((plist) => {
            assert.equal(plist.list.length, 0);
            new UserDAO("test").delete(parents.list[0]).then(res => done()).catch((err) => done(err))
          }).catch((err) => {
          done(err)
        })        
        }).catch((err) => {
          done(err)
        })
      }).catch(err => done(err))

    });
  });
});
