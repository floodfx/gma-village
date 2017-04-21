package com.gmavillage.lambda.db;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.Parent;

public class ParentMapper implements RowMapper<Parent> {

  @Override
  public Parent mapRow(final ResultSet r, final int rowNum) throws SQLException {
    final Parent p = new Parent(new UserMapper().mapRow(r, rowNum));


    return p;
  }

}
