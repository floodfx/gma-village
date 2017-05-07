package com.gmavillage.lambda.db;

import java.util.List;

import org.flywaydb.core.Flyway;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.gmavillage.model.CareNeed;
import com.gmavillage.model.CareNeed.DeliveryStatusType;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Parent;
import com.gmavillage.test.TestUtils;
import com.google.common.collect.Lists;

public class CareNeedDBTest {

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
  public void testCreateCareNeedGetCareNeedUpdateCareNeed() throws Exception {

    final UserDB userDB = new UserDB();
    final Parent p = userDB.createParent(testUtils.generateParent(2));
    Assert.assertTrue(p.getId() != null);
    Assert.assertTrue(Lists.newArrayList(p.getChildren()).get(0).getId() != null);
    Assert.assertTrue(Lists.newArrayList(p.getChildren()).get(1).getId() != null);
    final List<Gma> gmas = Lists.newArrayList(userDB.createGma(testUtils.generateGma()),
        userDB.createGma(testUtils.generateGma()), userDB.createGma(testUtils.generateGma()));
    Assert.assertTrue(gmas.get(1).getId() != null);

    final CareNeedDB careNeedDB = new CareNeedDB();
    final CareNeed c = testUtils.generateCareNeed(p, gmas);
    final CareNeed saved = careNeedDB.createCareNeed(c);

    assertCareNeedValuesSet(c, saved);

    saved.setDeliveryStatus(DeliveryStatusType.QUEUED);
    Assert.assertTrue(careNeedDB.updateCareNeedStatus(saved));
  }

  public void assertCareNeedValuesSet(final CareNeed a, final CareNeed b) {
    Assert.assertEquals(a.getOtherNeighborhood(), b.getOtherNeighborhood());
    Assert.assertEquals(a.getCareLocations(), b.getCareLocations());
    Assert.assertEquals(a.getChildren(), b.getChildren());
    Assert.assertEquals(a.getDeliveryStatus(), b.getDeliveryStatus());
    Assert.assertEquals(a.getEndTime(), b.getEndTime());
    Assert.assertEquals(a.getMatchingGmas(), b.getMatchingGmas());
    Assert.assertEquals(a.getNeighborhood(), b.getNeighborhood());
    Assert.assertEquals(a.getParentId(), b.getParentId());
    Assert.assertEquals(a.getStartTime(), b.getStartTime());
    Assert.assertEquals(a.getTimezone(), b.getTimezone());
  }



}
