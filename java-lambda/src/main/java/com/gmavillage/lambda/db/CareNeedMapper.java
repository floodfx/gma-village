package com.gmavillage.lambda.db;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.TimeZone;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.CareNeed;
import com.gmavillage.model.CareNeed.DeliveryStatusType;
import com.gmavillage.model.Parent;

public class CareNeedMapper {

  public static CareNeed mapQuery(final ResultSet r) throws SQLException, DataAccessException {
    final CareNeed c = new CareNeed();
    c.setId(r.getInt("id"));
    final Parent parent = new Parent();
    parent.setId(r.getInt("parent_id"));
    c.setParent(parent);
    c.setCareLocationsStrings(asList(r.getArray("care_locations")));
    c.setTimezone(TimeZone.getTimeZone(r.getString("timezone_name")));
    c.setNeighborhood(NeighborhoodMapper.mapQuery(r));
    c.setOtherNeighborhood(r.getString("other_neighborhood"));
    c.setStartTime(r.getObject("start_time", OffsetDateTime.class));
    c.setEndTime(r.getObject("end_time", OffsetDateTime.class));
    c.setDeliveryStatus(DeliveryStatusType.valueOf(r.getString("delivery_status")));
    return c;
  }

  public static class One implements ResultSetExtractor<CareNeed> {
    @Override
    public CareNeed extractData(final ResultSet r) throws SQLException, DataAccessException {
      if (r.next()) {
        return mapQuery(r);
      }
      return null;
    }
  }

  public static class List implements RowMapper<CareNeed> {
    @Override
    public CareNeed mapRow(final ResultSet r, final int rowNum) throws SQLException {
      return mapQuery(r);
    }
  }

  public static java.util.List<String> asList(final Array vals) throws SQLException {
    return Arrays.asList((String[]) vals.getArray());
  }

}
