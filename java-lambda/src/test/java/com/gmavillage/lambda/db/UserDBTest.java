package com.gmavillage.lambda.db;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.flywaydb.core.Flyway;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.gmavillage.model.User;

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
  public void testCreateAndGetUser() throws Exception {

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
  }

  @Test
  public void testGetAllUsers() throws Exception {
    final UserDB db = new UserDB();
    final User created = db.createUser(generateUser());
    final List<User> users = db.getAllUsers();
    Assert.assertEquals(users.size(), 1);
    Assert.assertEquals(created, users.get(0));
  }

  private User generateUser() {
    final User u = new User();
    u.setFirstName("first");
    u.setLastName("last");
    u.setPhone("phone");
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

}
