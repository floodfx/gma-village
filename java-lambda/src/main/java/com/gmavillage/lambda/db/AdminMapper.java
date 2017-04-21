package com.gmavillage.lambda.db;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.Admin;

public class AdminMapper implements RowMapper<Admin> {

  @Override
  public Admin mapRow(final ResultSet r, final int rowNum) throws SQLException {
    return new Admin(new UserMapper().mapRow(r, rowNum));
  }

}
