package com.gmavillage.lambda.db;

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

  public UserDB() {
    this(postgresDataSource());
  }

  public UserDB(final DataSource ds) {
    namedTemplate = new NamedParameterJdbcTemplate(ds);
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
    return this.namedTemplate.query(loadSqlFile("createGma"), userSource(g), new GmaMapper())
        .get(0);
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

}
