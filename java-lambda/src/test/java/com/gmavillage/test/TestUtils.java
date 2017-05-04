package com.gmavillage.test;

import java.io.InputStreamReader;
import java.sql.Timestamp;
import java.util.Arrays;

import org.flywaydb.core.Flyway;
import org.joda.time.LocalDateTime;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.db.Database;
import com.gmavillage.model.Admin;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Parent;
import com.gmavillage.model.User;
import com.google.common.collect.Lists;
import com.google.common.io.CharStreams;
import com.google.gson.Gson;

public class TestUtils {

  public void resetDB() {
    final Flyway flyway = new Flyway();
    flyway.setDataSource(Database.postgresDataSource());
    flyway.setLocations("filesystem:src/main/resources/com/gmavillage/lambda/db/migrations");
    flyway.clean();
    System.out.println("migrated version:" + flyway.migrate());
  }

  int offset = 0;

  public User generateUser() {
    offset += 1;
    final User u = new User();
    u.setFirstName("first" + offset);
    u.setLastName("last" + offset);
    u.setPhone("phone" + offset);
    u.setUserType("admin");
    u.setAcceptedTerms(false);
    u.setAccountKitAccessToken("accessToken" + offset);
    u.setAccountKitAccessTokenExpiresAt(
        new Timestamp(new LocalDateTime().toDateTime().getMillis()));
    u.setAccountKitUserId("akUserId" + offset);
    u.setActive(true);
    u.setCreatedByUser(null);
    u.setDeleted(false);
    u.setProfileImageUrl("profileImageUrl" + offset);
    // System.out.println(ToStringBuilder.reflectionToString(u));
    return u;
  }

  public Admin generateAdmin() {
    return new Admin(generateUser());
  }

  public Gma generateGma() {
    final Gma g = new Gma(generateUser());
    if (offset % 2 == 0) {
      g.setAvailabilities(Lists.newArrayList("early_morning", "daytime"));
      g.setCareAges(Lists.newArrayList("zero_to_six_months", "six_months_to_two_years"));
      g.setCareExperiences(Lists.newArrayList("raised_kids", "worked_baby_sitting"));
      g.setCareLocations(Lists.newArrayList("providers_home"));
      g.setCareTrainings(Lists.newArrayList("Gma Village Training"));
      g.setDemeanors(Lists.newArrayList("outgoing"));
    }
    g.setOtherAvailability("other" + offset);
    g.setOtherCareExperience("other" + offset);
    g.setOtherDemeanor("demeanor" + offset);
    return g;
  }

  public Parent generateParent() {
    final Parent p = new Parent(generateUser());
    if (offset % 2 == 0) {
      p.setNeedRecurrence(Arrays.asList("full_time", "part_time"));
      p.setNeedTimeOfDay(Arrays.asList("early_morning", "daytime"));
      p.setNeedLocations(Arrays.asList("providers_home"));
    }
    p.setOtherTimeOfDay("noon" + offset);
    p.setNeighborhoodId(null);
    p.setOtherNeighborhood("Rosebud" + offset);
    p.setWhyJoin("Because" + offset);
    p.setAdditionalInfo("More reasons" + offset);
    return p;
  }

  public LambdaProxyEvent loadJsonFile(final String name) throws Exception {
    final String json = CharStreams.toString(
        new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(name)));
    return new Gson().fromJson(json, LambdaProxyEvent.class);
  }

}
