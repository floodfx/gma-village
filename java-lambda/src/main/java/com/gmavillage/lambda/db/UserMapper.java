package com.gmavillage.lambda.db;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.User;

public class UserMapper implements RowMapper<User> {

  @Override
  public User mapRow(final ResultSet r, final int rowNum) throws SQLException {
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


}
