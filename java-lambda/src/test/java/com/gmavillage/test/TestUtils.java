package com.gmavillage.test;

import static com.gmavillage.model.CareAgeType.TWO_YEARS_TO_FIVE_YEARS;
import static com.gmavillage.model.CareAgeType.ZERO_TO_SIX_MONTHS;
import static com.gmavillage.model.CareExperienceType.RAISED_KIDS;
import static com.gmavillage.model.CareExperienceType.WORKED_BABYSITTING;
import static com.gmavillage.model.CareLocationType.PROVIDERS_HOME;
import static com.gmavillage.model.DemeanorType.CALM;
import static com.gmavillage.model.RecurrenceType.FULL_TIME;
import static com.gmavillage.model.RecurrenceType.ONE_TIME;
import static com.gmavillage.model.TimeOfDayType.DAYTIME;
import static com.gmavillage.model.TimeOfDayType.EARLY_MORNING;
import static com.gmavillage.model.TimeOfDayType.EVENING;

import java.io.InputStreamReader;
import java.sql.Timestamp;
import java.util.Arrays;

import org.flywaydb.core.Flyway;
import org.joda.time.LocalDateTime;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.db.Database;
import com.gmavillage.model.Admin;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Neighborhoods;
import com.gmavillage.model.Parent;
import com.gmavillage.model.User;
import com.gmavillage.model.UserType;
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
    u.setUserType(UserType.ADMIN);
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
      g.setAvailabilities(Lists.newArrayList(EARLY_MORNING, DAYTIME));
      g.setCareAges(Lists.newArrayList(ZERO_TO_SIX_MONTHS, TWO_YEARS_TO_FIVE_YEARS));
      g.setCareExperiences(Lists.newArrayList(RAISED_KIDS, WORKED_BABYSITTING));
      g.setCareLocations(Lists.newArrayList(PROVIDERS_HOME));
      g.setCareTrainings(Lists.newArrayList("Gma Village Training"));
      g.setDemeanors(Lists.newArrayList(CALM));
    }
    g.setNeighborhood(Neighborhoods.OTHER_OAKLAND);
    g.setOtherAvailability("other" + offset);
    g.setOtherCareExperience("other" + offset);
    g.setOtherDemeanor("demeanor" + offset);
    return g;
  }

  public Parent generateParent() {
    final Parent p = new Parent(generateUser());
    if (offset % 2 == 0) {
      p.setNeedRecurrence(Arrays.asList(FULL_TIME, ONE_TIME));
      p.setNeedTimeOfDay(Arrays.asList(EVENING, EARLY_MORNING));
      p.setNeedLocations(Arrays.asList(PROVIDERS_HOME));
    }
    p.setOtherTimeOfDay("noon" + offset);
    p.setNeighborhood(Neighborhoods.ALAMEDA);
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
