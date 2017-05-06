package com.gmavillage.lambda.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.Child;
import com.gmavillage.model.Parent;

public class ParentMapper {

  public static Parent mapQuery(final ResultSet r) throws SQLException, DataAccessException {
    final UserMapper userMapper = new UserMapper();
    final Parent p = new Parent(userMapper.mapQuery(r));
    p.setNeedRecurrenceStrings(userMapper.asList(r.getArray("need_recurrence")));
    p.setNeedTimeOfDayStrings(userMapper.asList(r.getArray("need_time_of_day")));
    p.setNeedLocationsStrings(userMapper.asList(r.getArray("need_locations")));
    p.setOtherTimeOfDay(r.getString("other_need_time_of_day"));
    p.setNeighborhood(NeighborhoodMapper.mapQuery(r));
    p.setOtherNeighborhood(r.getString("other_neighborhood"));
    p.setWhyJoin(r.getString("why_join"));
    p.setAdditionalInfo(r.getString("additional_info"));

    return p;
  }

  public static class One implements ResultSetExtractor<Parent> {
    @Override
    public Parent extractData(final ResultSet r) throws SQLException, DataAccessException {
      if (r.next()) {
        return mapQuery(r);
      }
      return null;
    }
  }

  public static class List implements RowMapper<Parent> {
    @Override
    public Parent mapRow(final ResultSet r, final int rowNum) throws SQLException {
      return mapQuery(r);
    }
  }

  public static class Children implements RowMapper<Child> {
    @Override
    public Child mapRow(final ResultSet r, final int rowNum) throws SQLException {
      final Child c = new Child();
      c.setFirstName(r.getString("first_name"));
      c.setDob(new Timestamp(r.getDate("dob").getTime()).toLocalDateTime().toLocalDate());
      c.setNote(r.getString("note"));
      return c;
    }
  }



}
