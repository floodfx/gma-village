var assert = require('assert');
var {
  Gma,
  Availability,
  CareAge,
  CareExperience,
  CareLocation,
  CareTraining,
  City,
  Demeanor,
  Neighborhood
} = require('../lib/index')

describe('Gma', function() {
  describe('constructor', function() {
    it('should work', function() {
      var g = new Gma(
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
      assert.equal(g.id, "id");
      assert.equal(g.first_name, "fn");
      assert.equal(g.last_name, "ln");
      assert.equal(g.phone, "ph");
      assert.equal(g.kind, "Gma");
      assert.ok(g.active);
      assert.equal(g.ak_access_token, "ak_token");
      assert.equal(g.ak_user_id, "ak_uid");
      assert.equal(g.ak_token_refresh_interval_sec, 1);
      assert.equal(g.ak_token_last_renewed_timestamp, 12);
      assert.equal(g.last_login_timestamp, 123);
      assert.equal(g.created_on_timestamp, 1234);
      assert.equal(g.member_since_timestamp, 12345);
      assert.deepEqual(g.availabilities, [Availability.DAYTIME.name])
      assert.deepEqual(g.otherAvailability, ["Holidays"])
      assert.deepEqual(g.careAges, [CareAge.ZERO_TO_SIX_MONTHS.name])
      assert.deepEqual(g.careExperiences, [CareExperience.WORKED_BABYSITTING.name])
      assert.deepEqual(g.otherCareExperience, ["Foster"])
      assert.deepEqual(g.careLocations, [CareLocation.CHILDS_HOME.name])
      assert.deepEqual(g.careTrainings, [CareTraining.CPR_AND_FIRST_AID.name])
      assert.deepEqual(g.otherCareTraining, ["Classes"])
      assert.equal(g.city, City.OAKLAND.name)
      assert.deepEqual(g.demeanors, [Demeanor.PATIENT.name])
      assert.deepEqual(g.otherDemeanor, ["Cool"])
      assert.equal(g.neighborhood, Neighborhood.NORTH_OAKLAND.name)
      assert.deepEqual(g.otherNeighborhood, ["Rockridge"])
      assert.ok(g.isAvailableOutsideNeighborhood)
      assert.equal(g.whyCareForKidsText, "Because they are the future")
      assert.equal(g.additionalInformationText, "Add")
      assert.equal(g.profilePhotoUrl, "profilePhotoUrl")
    });
  });
});
