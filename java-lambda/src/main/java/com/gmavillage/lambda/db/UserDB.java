package com.gmavillage.lambda.db;

import java.sql.Array;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

import com.gmavillage.model.Admin;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Parent;
import com.gmavillage.model.User;

public class UserDB extends Database {

  private final NamedParameterJdbcTemplate namedTemplate;
  private final DataSource dataSource;

  public UserDB() {
    this(postgresDataSource());
  }

  public UserDB(final DataSource dataSource) {
    this.dataSource = dataSource;
    this.namedTemplate = new NamedParameterJdbcTemplate(dataSource);
  }

  public User createUser(final User u) throws Exception {
    return this.namedTemplate.query(loadSqlFile("createUser"), userSource(u), new UserMapper())
        .get(0);
  }

  public User getUser(final int id, final boolean includeDeleted) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("user_id", id);
    source.addValue("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getUser"), source, new UserMapper()).get(0);
  }

  public List<User> getAllUsers() throws Exception {
    return getAllUsers(false);
  }

  public List<User> getAllUsers(final boolean includeDeleted) throws Exception {
    final SqlParameterSource source = new MapSqlParameterSource("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getAllUsers"), source, new UserMapper());
  }

  public Admin createAdmin(final Admin a) throws Exception {
    return this.namedTemplate.query(loadSqlFile("createAdmin"), userSource(a), new AdminMapper())
        .get(0);
  }

  public Admin getAdmin(final int id, final boolean includeDeleted) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("user_id", id);
    source.addValue("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getAdmin"), source, new AdminMapper()).get(0);
  }

  public List<Admin> getAllAdmins() throws Exception {
    return getAllAdmins(false);
  }

  public List<Admin> getAllAdmins(final boolean includeDeleted) throws Exception {
    final SqlParameterSource source = new MapSqlParameterSource("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getAllAdmins"), source, new AdminMapper());
  }

  public Parent createParent(final Parent p) throws Exception {
    return this.namedTemplate.query(loadSqlFile("createParent"), userSource(p), new ParentMapper())
        .get(0);
  }

  public Parent getParent(final int id, final boolean includeDeleted) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("user_id", id);
    source.addValue("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getParent"), source, new ParentMapper()).get(0);
  }

  public List<Parent> getAllParents() throws Exception {
    return getAllParents(false);
  }

  public List<Parent> getAllParents(final boolean includeDeleted) throws Exception {
    final SqlParameterSource source = new MapSqlParameterSource("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getAllParents"), source, new ParentMapper());
  }

  public Gma createGma(final Gma g) throws Exception {
    // final BeanPropertySqlParameterSource source = userSource(g);
    final MapSqlParameterSource source = userMapSource(g);
    source.addValue("availabilities", createSqlArray(g.getAvailabilities()), Types.ARRAY);
    source.addValue("otherAvailability", g.getOtherAvailability());
    source.addValue("careAges", createSqlArray(g.getCareAges()), Types.ARRAY);
    source.addValue("careExperiences", createSqlArray(g.getCareExperiences()), Types.ARRAY);
    source.addValue("otherCareExperience", g.getOtherCareExperience());
    source.addValue("careLocations", createSqlArray(g.getCareLocations()), Types.ARRAY);
    source.addValue("demeanors", createSqlArray(g.getDemeanors()), Types.ARRAY);
    source.addValue("otherDemeanor", g.getOtherDemeanor());
    source.addValue("careTrainings", createSqlArray(g.getCareTrainings()), Types.ARRAY);
    source.addValue("neighborhoodId", g.getNeighborhoodId());
    source.addValue("otherNeighborhood", g.getOtherNeighborhood());
    source.addValue("availableOutsideNeighborhood", g.isAvailableOutsideNeighborhood());
    source.addValue("whyCareForKids", g.getWhyCareForKids());
    source.addValue("additionalInfo", g.getAdditionalInfo());
    return this.namedTemplate.query(loadSqlFile("createGma"), source, new GmaMapper()).get(0);
  }

  public Gma getGma(final int id, final boolean includeDeleted) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("user_id", id);
    source.addValue("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getGma"), source, new GmaMapper()).get(0);
  }

  public List<Gma> getAllGmas() throws Exception {
    return getAllGmas(false);
  }

  public List<Gma> getAllGmas(final boolean includeDeleted) throws Exception {
    final SqlParameterSource source = new MapSqlParameterSource("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getAllGmas"), source, new GmaMapper());
  }

  private BeanPropertySqlParameterSource userSource(final Object user) {
    return new BeanPropertySqlParameterSource(user);
  }

  private MapSqlParameterSource userMapSource(final User user) {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("firstName", user.getFirstName());
    source.addValue("lastName", user.getLastName());
    source.addValue("phone", user.getPhone());
    source.addValue("userType", user.getUserType());
    source.addValue("acceptedTerms", user.isAcceptedTerms());
    source.addValue("accountKitAccessToken", user.getAccountKitAccessToken());
    source.addValue("accountKitAccessTokenExpiresAt", user.getAccountKitAccessTokenExpiresAt());
    source.addValue("accountKitUserId", user.getAccountKitUserId());
    source.addValue("active", user.isActive());
    source.addValue("createdByUser", user.getCreatedByUser());
    source.addValue("deleted", user.isDeleted());
    source.addValue("profileImageUrl", user.getProfileImageUrl());
    return source;
  }

  private Array createSqlArray(final List<String> list) {
    return createSqlArray(list, "varchar");
  }


  private Array createSqlArray(final List<String> list, final String type) {
    Array stringArray = null;
    try {
      stringArray = dataSource.getConnection().createArrayOf(type, list.toArray());
    } catch (final SQLException ignore) {
    }
    return stringArray;
  }

}
