package com.gmavillage.lambda.api;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import org.junit.Assert;
import org.junit.Test;

import com.gmavillage.model.CareNeed;
import com.gmavillage.model.Neighborhoods;

public class CareNeedMessageFormatterTest {

  @Test
  public void testFormatPhone() {
    final String phone = "4152221133";
    final String formattedPhone = CareNeedMessageFormatter.formatPhone(phone);
    Assert.assertEquals("415-222-1133", formattedPhone);
  }

  @Test
  public void testFormatDate() {
    final OffsetDateTime odt = OffsetDateTime.of(2017, 5, 10, 12, 11, 00, 0, ZoneOffset.UTC);
    final String formattedDate = CareNeedMessageFormatter.friendlyDateTime(odt);
    Assert.assertEquals("May 10, 12:11PM", formattedDate);
  }

  @Test
  public void testNeighborhood() {
    final CareNeed need = new CareNeed();
    need.setNeighborhood(Neighborhoods.ALAMEDA);
    final String neighText = CareNeedMessageFormatter.neighborhood(need);
    Assert.assertEquals(Neighborhoods.ALAMEDA.getName(), neighText);
  }

  @Test
  public void testOtherNeighborhood() {
    final CareNeed need = new CareNeed();
    need.setNeighborhood(Neighborhoods.OTHER_OAKLAND);
    need.setOtherNeighborhood("Denver");
    final String neighText = CareNeedMessageFormatter.neighborhood(need);
    Assert.assertEquals("Denver", neighText);
  }

}
