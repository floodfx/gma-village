package com.gmavillage.test;

import java.sql.Timestamp;
import java.util.Arrays;

import org.flywaydb.core.Flyway;

import com.gmavillage.lambda.db.Database;
import com.gmavillage.model.Admin;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Parent;
import com.gmavillage.model.User;
import com.google.common.collect.Lists;

public class TestUtils {

  public void resetDB() {
    final Flyway flyway = new Flyway();
    flyway.setDataSource(Database.postgresDataSource());
    flyway.setLocations("filesystem:src/main/java/com/gmavillage/lambda/db/migrations");
    flyway.clean();
    System.out.println("migrated version:" + flyway.migrate());
  }

  int phone = 0;

  public User generateUser() {
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

  public Admin generateAdmin() {
    return new Admin(generateUser());
  }

  public Gma generateGma() {
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

  public Parent generateParent() {
    final Parent p = new Parent(generateUser());
    p.setNeedRecurrence(Arrays.asList("full_time", "part_time"));
    p.setNeedTimeOfDay(Arrays.asList("early_morning", "daytime"));
    p.setNeedLocations(Arrays.asList("providers_home"));
    p.setOtherTimeOfDay("noon");
    p.setNeighborhoodId(null);
    p.setOtherNeighborhood("Rosebud");
    p.setWhyJoin("Because");
    p.setAdditionalInfo("More reasons");
    return p;
  }

}
