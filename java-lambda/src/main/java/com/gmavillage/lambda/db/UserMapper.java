package com.gmavillage.lambda.db;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.User;

public class UserMapper {

  public static User mapQuery(final ResultSet r) throws SQLException, DataAccessException {
    final User u = new User();
    u.setId(r.getInt("id"));
    u.setFirstName(r.getString("first_name"));
    u.setLastName(r.getString("last_name"));
    u.setPhone(r.getString("phone"));
    u.setPhone(r.getString("phone"));
    u.setUserType(r.getString("user_type"));
    u.setActive(r.getBoolean("active"));
    u.setProfileImageUrl(r.getString("profile_image_url"));
    u.setAccountKitAccessToken(r.getString("account_kit_access_token"));
    u.setAccountKitUserId(r.getString("account_kit_user_id"));
    u.setAccountKitAccessTokenExpiresAt(r.getTimestamp("account_kit_access_token_expires_at"));
    u.setAcceptedTerms(r.getBoolean("accepted_terms"));
    u.setCreatedByUser(Integer.getInteger(r.getString("created_by_user")));
    u.setCreatedOn(r.getTimestamp("created_on"));
    u.setUpdatedAt(r.getTimestamp("updated_at"));
    return u;
  }

  public static class One implements ResultSetExtractor<User> {
    @Override
    public User extractData(final ResultSet r) throws SQLException, DataAccessException {
      if (r.next()) {
        return mapQuery(r);
      }
      return null;
    }
  }

  public static class List implements RowMapper<User> {
    @Override
    public User mapRow(final ResultSet r, final int rowNum) throws SQLException {
      return mapQuery(r);
    }
  }

  public java.util.List<String> asList(final Array vals) throws SQLException {
    return Arrays.asList((String[]) vals.getArray());
  }

}
