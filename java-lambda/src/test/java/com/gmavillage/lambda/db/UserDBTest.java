package com.gmavillage.lambda.db;

import java.time.LocalDate;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.flywaydb.core.Flyway;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.gmavillage.model.Admin;
import com.gmavillage.model.Child;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Parent;
import com.gmavillage.model.User;
import com.gmavillage.test.TestUtils;
import com.google.api.client.util.Lists;

public class UserDBTest {

  TestUtils testUtils = new TestUtils();

  @Before
  public void resetDB() {
    final Flyway flyway = new Flyway();
    flyway.setDataSource(Database.postgresDataSource());
    flyway.setLocations("filesystem:src/main/resources/com/gmavillage/lambda/db/migrations");
    flyway.clean();
    System.out.println("migrated version:" + flyway.migrate());
  }



  @Test
  public void testCreateUserGetUserUpdateUser() throws Exception {

    final UserDB db = new UserDB();


    final User u = testUtils.generateUser();

    final User savedUser = db.createUser(u);

    Assert.assertNotNull(savedUser.getId());
    assertUserValuesSet(u, savedUser);

    final User gotUser = db.getUser(savedUser.getId(), false);
    assertUserValuesSet(gotUser, savedUser);

    final User u2 = testUtils.generateUser();
    u2.setId(gotUser.getId());
    u2.setAccountKitUserId(gotUser.getAccountKitUserId());

    final User updatedUser = db.updateUser(u2);
    assertUserValuesSet(u2, updatedUser);
  }

  public void testCreateAdminGetAdminUpdateAdmin() throws Exception {

    final UserDB db = new UserDB();


    final Admin a = testUtils.generateAdmin();

    final Admin savedAdmin = db.createAdmin(a);

    Assert.assertNotNull(savedAdmin.getId());
    assertUserValuesSet(a, savedAdmin);

    final Admin gotAdmin = db.getAdmin(savedAdmin.getId(), false);
    assertUserValuesSet(gotAdmin, savedAdmin);

    final Admin a2 = testUtils.generateAdmin();
    a2.setId(gotAdmin.getId());
    a2.setAccountKitUserId(gotAdmin.getAccountKitUserId());

    final Admin updatedAdmin = db.updateAdmin(a2);
    assertUserValuesSet(a2, updatedAdmin);
  }

  @Test
  public void testGetAllUsers() throws Exception {
    final UserDB db = new UserDB();
    final User gen1 = testUtils.generateUser();
    final User gen2 = testUtils.generateUser();
    final User created = db.createUser(gen1);
    final User created2 = db.createUser(gen2);
    final List<User> users = db.getAllUsers();
    Assert.assertEquals(users.size(), 2);
    Assert.assertEquals(created, users.get(0));
    Assert.assertEquals(created2, users.get(1));
    assertUserValuesSet(gen1, created);
    assertUserValuesSet(gen2, created2);
  }

  @Test
  public void testCreateGmaAndGetGma() throws Exception {

    final UserDB db = new UserDB();

    final Gma g = testUtils.generateGma();

    final Gma savedGma = db.createGma(g);
    Assert.assertNotNull(savedGma.getId());
    assertUserValuesSet(g, savedGma);
    assertGmaValuesSet(g, savedGma);

    final Gma gotGma = db.getGma(savedGma.getId(), false);
    Assert.assertEquals(gotGma.getId(), savedGma.getId());
    assertGmaValuesSet(gotGma, savedGma);

    final Gma dg = testUtils.generateGma();
    dg.setId(gotGma.getId());
    dg.setPhone(gotGma.getPhone());

    final Gma updatedGma = db.updateGma(dg);
    Assert.assertEquals(gotGma.getId(), updatedGma.getId());
    assertGmaValuesSet(updatedGma, dg);

  }


  @Test
  public void testGetAllGmas() throws Exception {
    final UserDB db = new UserDB();
    final Gma created = db.createGma(testUtils.generateGma());
    final Gma created2 = db.createGma(testUtils.generateGma());
    final List<Gma> gmas = db.getAllGmas();
    Assert.assertEquals(gmas.size(), 2);
    Assert.assertEquals(created, gmas.get(0));
    Assert.assertEquals(created2, gmas.get(1));
  }

  @Test
  public void testCreateAndGetParent() throws Exception {

    final UserDB db = new UserDB();

    final Parent p = testUtils.generateParent();

    final Parent savedParent = db.createParent(p);
    System.out.println(ToStringBuilder.reflectionToString(savedParent));
    Assert.assertNotNull(savedParent.getId());
    assertUserValuesSet(p, savedParent);
    assertParentValuesSet(p, savedParent);

    final Parent gotParent = db.getParent(savedParent.getId(), false);
    Assert.assertEquals(gotParent.getId(), savedParent.getId());
    assertUserValuesSet(gotParent, savedParent);
    assertParentValuesSet(gotParent, savedParent);

  }

  @Test
  public void testCreateParentAndGetParentUpdateChildrenAndGetParent() throws Exception {

    final UserDB db = new UserDB();

    final Parent p = testUtils.generateParent();
    final Child c = new Child();
    final LocalDate dob = LocalDate.now();
    c.setDob(dob);
    c.setFirstName("child");
    c.setNote("notes");
    p.getChildren().add(c);

    final Parent savedParent = db.createParent(p);
    System.out.println(ToStringBuilder.reflectionToString(savedParent));
    Assert.assertNotNull(savedParent.getId());
    Assert.assertEquals(p.getNeedRecurrence(), savedParent.getNeedRecurrence());
    Assert.assertTrue(savedParent.getChildren().size() > 0);
    Assert.assertEquals(p.getChildren(), savedParent.getChildren());

    final Parent gotParent = db.getParent(savedParent.getId(), false);
    Assert.assertEquals(gotParent.getId(), savedParent.getId());
    Assert.assertEquals(gotParent.getNeedRecurrence(), savedParent.getNeedRecurrence());
    Assert.assertEquals(gotParent.getChildren().size(), 1);
    assertUserValuesSet(gotParent, savedParent);
    assertParentValuesSet(gotParent, savedParent);

    final Child c2 = new Child();
    final LocalDate dob2 = LocalDate.now().minusDays(2);
    c2.setDob(dob2);
    c2.setFirstName("child2");
    c2.setNote("notes2");
    gotParent.getChildren().add(c2);

    final Parent updatedParent = db.updateParent(gotParent);
    Assert.assertEquals(gotParent.getId(), updatedParent.getId());
    Assert.assertEquals(gotParent.getNeedRecurrence(), updatedParent.getNeedRecurrence());
    Assert.assertEquals(updatedParent.getChildren().size(), 2);

  }


  @Test
  public void testGetAllParents() throws Exception {
    final UserDB db = new UserDB();
    final Parent created = db.createParent(testUtils.generateParent());
    final Parent created2 = db.createParent(testUtils.generateParent());
    final List<Parent> parents = db.getAllParents();
    Assert.assertEquals(parents.size(), 2);
    Assert.assertEquals(created, parents.get(0));
    Assert.assertEquals(created2, parents.get(1));
  }

  public void assertParentValuesSet(final Parent a, final Parent b) {
    Assert.assertEquals(a.getAdditionalInfo(), b.getAdditionalInfo());
    Assert.assertEquals(a.getOtherTimeOfDay(), b.getOtherTimeOfDay());
    Assert.assertEquals(a.getWhyJoin(), b.getWhyJoin());
    Assert.assertEquals(a.getOtherTimeOfDay(), b.getOtherTimeOfDay());
    Assert.assertEquals(a.getNeedLocations(), b.getNeedLocations());
    Assert.assertEquals(a.getNeedRecurrence(), b.getNeedRecurrence());
    Assert.assertEquals(a.getNeedTimeOfDay(), b.getNeedTimeOfDay());
    Assert.assertEquals(a.getOtherNeighborhood(), b.getOtherNeighborhood());
    Assert.assertEquals(a.getNeighborhoodId(), b.getNeighborhoodId());
    Assert.assertEquals(a.getChildren().size(), b.getChildren().size());
    final List<Child> ac = Lists.newArrayList(a.getChildren());
    final List<Child> bc = Lists.newArrayList(b.getChildren());

    for (int i = 0; i < ac.size() && i < bc.size(); i++) {
      final Child aac = ac.get(i);
      final Child bbc = bc.get(i);
      Assert.assertEquals(aac, bbc);
    }
  }


  public void assertGmaValuesSet(final Gma a, final Gma b) {
    Assert.assertEquals(a.getAdditionalInfo(), b.getAdditionalInfo());
    Assert.assertEquals(a.getOtherAvailability(), b.getOtherAvailability());
    Assert.assertEquals(a.getOtherCareExperience(), b.getOtherCareExperience());
    Assert.assertEquals(a.getOtherDemeanor(), b.getOtherDemeanor());
    Assert.assertEquals(a.getOtherNeighborhood(), b.getOtherNeighborhood());
    Assert.assertEquals(a.getWhyCareForKids(), b.getWhyCareForKids());
    Assert.assertEquals(a.getAvailabilities(), b.getAvailabilities());
    Assert.assertEquals(a.getCareAges(), b.getCareAges());
    Assert.assertEquals(a.getCareExperiences(), b.getCareExperiences());
    Assert.assertEquals(a.getCareLocations(), b.getCareLocations());
    Assert.assertEquals(a.getCareTrainings(), b.getCareTrainings());
    Assert.assertEquals(a.getDemeanors(), b.getDemeanors());
    Assert.assertEquals(a.getNeighborhoodId(), b.getNeighborhoodId());
  }

  public void assertUserValuesSet(final User savedUser, final User suppliedUser) {
    Assert.assertEquals(suppliedUser.getFirstName(), savedUser.getFirstName());
    Assert.assertEquals(suppliedUser.getLastName(), savedUser.getLastName());
    Assert.assertEquals(suppliedUser.getPhone(), savedUser.getPhone());
    Assert.assertEquals(suppliedUser.getUserType(), savedUser.getUserType());
    Assert.assertEquals(suppliedUser.isAcceptedTerms(), savedUser.isAcceptedTerms());
    Assert.assertEquals(suppliedUser.getAccountKitAccessToken(),
        savedUser.getAccountKitAccessToken());
    Assert.assertEquals(suppliedUser.getAccountKitAccessTokenExpiresAt(),
        savedUser.getAccountKitAccessTokenExpiresAt());
    Assert.assertEquals(suppliedUser.getAccountKitUserId(), savedUser.getAccountKitUserId());
    Assert.assertEquals(suppliedUser.isActive(), savedUser.isActive());
    Assert.assertEquals(suppliedUser.getCreatedByUser(), savedUser.getCreatedByUser());
    Assert.assertEquals(suppliedUser.isDeleted(), savedUser.isDeleted());
    Assert.assertEquals(suppliedUser.getProfileImageUrl(), savedUser.getProfileImageUrl());
  }



}
