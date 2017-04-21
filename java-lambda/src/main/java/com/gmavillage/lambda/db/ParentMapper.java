package com.gmavillage.lambda.db;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.Parent;

public class ParentMapper implements RowMapper<Parent> {

  @Override
  public Parent mapRow(final ResultSet r, final int rowNum) throws SQLException {
    final UserMapper userMapper = new UserMapper();
    final Parent p = new Parent(userMapper.mapRow(r, rowNum));
    p.setNeedRecurrence(userMapper.asList(r.getArray("need_recurrence")));
    p.setNeedTimeOfDay(userMapper.asList(r.getArray("need_time_of_day")));
    p.setNeedLocations(userMapper.asList(r.getArray("need_locations")));
    p.setOtherTimeOfDay(r.getString("other_need_time_of_day"));
    p.setNeighborhoodId(Integer.getInteger(r.getString("neighborhood_id")));
    p.setOtherNeighborhood(r.getString("other_neighborhood"));
    p.setWhyJoin(r.getString("why_join"));
    p.setAdditionalInfo(r.getString("additional_info"));

    return p;
  }

}
