package com.gmavillage.lambda.db;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.Gma;

public class GmaMapper implements RowMapper<Gma> {

  @Override
  public Gma mapRow(final ResultSet r, final int rowNum) throws SQLException {
    final Gma g = new Gma(new UserMapper().mapRow(r, rowNum));

    return g;
  }

}
