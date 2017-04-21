package com.gmavillage.lambda.db;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.flywaydb.core.Flyway;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.gmavillage.model.Admin;
import com.gmavillage.model.Gma;
import com.gmavillage.model.User;
import com.google.common.collect.Lists;

public class UserDBTest {

  @Before
  public void resetDB() {
    final Flyway flyway = new Flyway();
    flyway.setDataSource(Database.postgresDataSource());
    flyway.setLocations("filesystem:src/main/java/com/gmavillage/lambda/db/migrations");
    flyway.clean();
    System.out.println("migrated version:" + flyway.migrate());
  }

  @Test
  public void testCreateUserAndGetUser() throws Exception {

    final UserDB db = new UserDB();

    final String firstName = "FirstName";
    final String lastName = "LastName";
    final String phone = "Phone";
    final String userType = "admin";
    final boolean acceptedTerms = true;
    final String accessToken = "accessToken";
    final Timestamp accessTokenExpires = new Timestamp(new Date().getTime());
    final String akUserId = "akUserId";
    final boolean active = true;
    final Integer createdByUser = null;
    final boolean deleted = false;
    final String profileImageUrl = "profileImageUrl";

    final User u = new User();
    u.setFirstName(firstName);
    u.setLastName(lastName);
    u.setPhone(phone);
    u.setUserType(userType);
    u.setAcceptedTerms(acceptedTerms);
    u.setAccountKitAccessToken(accessToken);
    u.setAccountKitAccessTokenExpiresAt(accessTokenExpires);
    u.setAccountKitUserId(akUserId);
    u.setActive(active);
    u.setCreatedByUser(createdByUser);
    u.setDeleted(deleted);
    u.setProfileImageUrl(profileImageUrl);

    final User savedUser = db.createUser(u);
    Assert.assertNotNull(savedUser.getId());
    Assert.assertEquals(u.getFirstName(), savedUser.getFirstName());
    Assert.assertEquals(u.getLastName(), savedUser.getLastName());
    Assert.assertEquals(u.getPhone(), savedUser.getPhone());
    Assert.assertEquals(u.getUserType(), savedUser.getUserType());
    Assert.assertEquals(u.isAcceptedTerms(), savedUser.isAcceptedTerms());
    Assert.assertEquals(u.getAccountKitAccessToken(), savedUser.getAccountKitAccessToken());
    Assert.assertEquals(u.getAccountKitAccessTokenExpiresAt(),
        savedUser.getAccountKitAccessTokenExpiresAt());
    Assert.assertEquals(u.getAccountKitUserId(), savedUser.getAccountKitUserId());
    Assert.assertEquals(u.isActive(), savedUser.isActive());
    Assert.assertEquals(u.getCreatedByUser(), savedUser.getCreatedByUser());
    Assert.assertEquals(u.isDeleted(), savedUser.isDeleted());
    Assert.assertEquals(u.getProfileImageUrl(), savedUser.getProfileImageUrl());

    final User gotUser = db.getUser(savedUser.getId(), false);
    Assert.assertEquals(gotUser.getId(), savedUser.getId());
    Assert.assertEquals(gotUser.getFirstName(), savedUser.getFirstName());
    Assert.assertEquals(gotUser.getLastName(), savedUser.getLastName());
    Assert.assertEquals(gotUser.getPhone(), savedUser.getPhone());
    Assert.assertEquals(gotUser.getUserType(), savedUser.getUserType());
    Assert.assertEquals(gotUser.isAcceptedTerms(), savedUser.isAcceptedTerms());
    Assert.assertEquals(gotUser.getAccountKitAccessToken(), savedUser.getAccountKitAccessToken());
    Assert.assertEquals(gotUser.getAccountKitAccessTokenExpiresAt(),
        savedUser.getAccountKitAccessTokenExpiresAt());
    Assert.assertEquals(gotUser.getAccountKitUserId(), savedUser.getAccountKitUserId());
    Assert.assertEquals(gotUser.isActive(), savedUser.isActive());
    Assert.assertEquals(gotUser.getCreatedByUser(), savedUser.getCreatedByUser());
    Assert.assertEquals(gotUser.isDeleted(), savedUser.isDeleted());
    Assert.assertEquals(gotUser.getProfileImageUrl(), savedUser.getProfileImageUrl());
  }

  @Test
  public void testCreateGmaAndGetGma() throws Exception {

    final UserDB db = new UserDB();

    final Gma g = generateGma();

    final Gma savedGma = db.createGma(g);
    System.out.println(ToStringBuilder.reflectionToString(savedGma));
    Assert.assertNotNull(savedGma.getId());
    Assert.assertEquals(g.getAvailabilities(), savedGma.getAvailabilities());

    final Gma gotGma = db.getGma(savedGma.getId(), false);
    Assert.assertEquals(gotGma.getId(), savedGma.getId());
    Assert.assertEquals(gotGma.getAvailabilities(), savedGma.getAvailabilities());

  }

  @Test
  public void testGetAllUsers() throws Exception {
    final UserDB db = new UserDB();
    final User created = db.createUser(generateUser());
    final User created2 = db.createUser(generateUser());
    final List<User> users = db.getAllUsers();
    Assert.assertEquals(users.size(), 2);
    Assert.assertEquals(created, users.get(0));
    Assert.assertEquals(created2, users.get(1));
  }

  int phone = 0;

  private User generateUser() {
    phone += 1;
    final User u = new User();
    u.setFirstName("first");
    u.setLastName("last");
    u.setPhone("phone" + phone);
    u.setUserType("admin");
    u.setAcceptedTerms(false);
    u.setAccountKitAccessToken("accessToken");
    u.setAccountKitAccessTokenExpiresAt(new Timestamp(new java.util.Date().getTime()));
    u.setAccountKitUserId("akUserId");
    u.setActive(true);
    u.setCreatedByUser(null);
    u.setDeleted(false);
    u.setProfileImageUrl("profileImageUrl");
    // System.out.println(ToStringBuilder.reflectionToString(u));
    return u;
  }

  private Admin generateAdmin() {
    return new Admin(generateUser());
  }

  private Gma generateGma() {
    final Gma g = new Gma(generateUser());
    g.setAvailabilities(Lists.newArrayList("early_morning", "daytime"));
    g.setOtherAvailability("other");
    g.setCareAges(Lists.newArrayList("zero_to_six_months", "six_months_to_two_years"));
    g.setCareExperiences(Lists.newArrayList("raised_kids", "worked_baby_sitting"));
    g.setOtherCareExperience("other");
    g.setCareLocations(Lists.newArrayList("providers_home"));
    g.setDemeanors(Lists.newArrayList("outgoing"));
    g.setOtherDemeanor("Fun!");
    g.setCareTrainings(Lists.newArrayList("Gma Village Training"));
    return g;
  }

  // private Parent generateParent() {
  // final Parent p = new Parent(generateUser());
  // p.setAdditionalInfo("Additional Info");
  // p.setNeedLocations();
  // g.setAvailabilities(Lists.newArrayList("early_morning", "daytime"));
  // g.setOtherAvailability("other");
  // g.setCareAges(Lists.newArrayList("zero_to_six_months", "six_months_to_two_years"));
  // g.setCareExperiences(Lists.newArrayList("raised_kids", "worked_baby_sitting"));
  // g.setOtherCareExperience("other");
  // g.setCareLocations(Lists.newArrayList("providers_home"));
  // g.setDemeanors(Lists.newArrayList("outgoing"));
  // g.setOtherDemeanor("Fun!");
  // g.setCareTrainings(Lists.newArrayList("Gma Village Training"));
  // return g;
  // }

}
