package com.gmavillage.lambda.db;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.Admin;

public class AdminMapper {

  public static class One implements ResultSetExtractor<Admin> {
    @Override
    public Admin extractData(final ResultSet r) throws SQLException, DataAccessException {
      return new Admin(new UserMapper.One().extractData(r));
    }
  }

  public static class List implements RowMapper<Admin> {
    @Override
    public Admin mapRow(final ResultSet r, final int rowNum) throws SQLException {
      return new Admin(new UserMapper.List().mapRow(r, rowNum));
    }
  }

}
