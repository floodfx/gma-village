package com.gmavillage.lambda.db;

import java.io.IOException;
import java.sql.Array;
import java.sql.Types;
import java.util.List;
import java.util.Set;

import javax.sql.DataSource;

import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

import com.gmavillage.model.Admin;
import com.gmavillage.model.Child;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Parent;
import com.gmavillage.model.User;
import com.google.common.collect.Sets;

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
    return this.namedTemplate.query(loadSqlFile("createUser"), userSource(u), new UserMapper.One());
  }

  public User getUser(final int id, final boolean includeDeleted) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("user_id", id);
    source.addValue("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getUser"), source, new UserMapper.One());
  }

  public User getUserByAccountKitUserId(final String akId) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("account_kit_user_id", akId);
    source.addValue("deleted", false);
    return this.namedTemplate.query(loadSqlFile("getUserByAccountKitUserId"), source,
        new UserMapper.One());
  }

  public User getUserByPhone(final String phone) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("phone", phone);
    source.addValue("deleted", false);
    return this.namedTemplate.query(loadSqlFile("getUserByPhone"), source, new UserMapper.One());
  }

  public User updateUser(final User updatedUser) throws Exception {
    return this.namedTemplate.query(loadSqlFile("updateUser"), userSource(updatedUser),
        new UserMapper.One());
  }

  public boolean deleteUser(final int userId) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("user_id", userId);
    this.namedTemplate.update(loadSqlFile("deleteUser"), source);
    return true;
  }

  public List<User> getAllUsers() throws Exception {
    return getAllUsers(false);
  }

  public List<User> getAllUsers(final boolean includeDeleted) throws Exception {
    final SqlParameterSource source = new MapSqlParameterSource("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getAllUsers"), source, new UserMapper.List());
  }

  public Admin createAdmin(final Admin a) throws Exception {
    return this.namedTemplate.query(loadSqlFile("createAdmin"), userSource(a),
        new AdminMapper.One());
  }

  public Admin getAdmin(final int id, final boolean includeDeleted) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("user_id", id);
    source.addValue("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getAdmin"), source, new AdminMapper.One());
  }

  public List<Admin> getAllAdmins() throws Exception {
    return getAllAdmins(false);
  }

  public List<Admin> getAllAdmins(final boolean includeDeleted) throws Exception {
    final SqlParameterSource source = new MapSqlParameterSource("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getAllAdmins"), source, new AdminMapper.List());
  }

  public Admin updateAdmin(final Admin updatedAdmin) throws Exception {
    return this.namedTemplate.query(loadSqlFile("updateAdmin"), userSource(updatedAdmin),
        new AdminMapper.One());
  }

  public Parent createParent(final Parent p) throws Exception {
    final MapSqlParameterSource source = userMapSource(p);
    final Array needRecurrenceArray =
        createSqlArray(enumListToNameList(p.getNeedRecurrence()), this.dataSource);
    final Array needTimeOfDayArray =
        createSqlArray(enumListToNameList(p.getNeedTimeOfDay()), this.dataSource);
    final Array needLocationsArray =
        createSqlArray(enumListToNameList(p.getNeedLocations()), this.dataSource);
    source.addValue("needRecurrence", needRecurrenceArray, Types.ARRAY);
    source.addValue("needTimeOfDay", needTimeOfDayArray, Types.ARRAY);
    source.addValue("needLocations", needLocationsArray, Types.ARRAY);
    source.addValue("otherNeedTimeOfDay", p.getOtherTimeOfDay());
    if (p.getNeighborhood() != null) {
      source.addValue("neighborhoodId", p.getNeighborhood().getId());
    } else {
      source.addValue("neighborhoodId", null);
    }
    source.addValue("otherNeighborhood", p.getOtherNeighborhood());
    source.addValue("additionalInfo", p.getAdditionalInfo());
    source.addValue("whyJoin", p.getWhyJoin());

    final Parent newP =
        this.namedTemplate.query(loadSqlFile("createParent"), source, new ParentMapper.One());

    needRecurrenceArray.free();
    needTimeOfDayArray.free();
    needLocationsArray.free();

    // insert children if exist
    if (!p.getChildren().isEmpty()) {
      p.setId(newP.getId());
      insertChildren(p);
      newP.setChildren(p.getChildren());
    }
    return newP;
  }

  public Parent getParent(final int id, final boolean includeDeleted) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("user_id", id);
    source.addValue("deleted", includeDeleted);
    final Parent p =
        this.namedTemplate.query(loadSqlFile("getParent"), source, new ParentMapper.One());
    p.setChildren(getChildren(p.getId()));
    return p;
  }

  public Parent updateParent(final Parent p) throws Exception {
    final MapSqlParameterSource source = userMapSource(p);
    final Array needRecurrenceArray =
        createSqlArray(enumListToNameList(p.getNeedRecurrence()), this.dataSource);
    final Array needTimeOfDayArray =
        createSqlArray(enumListToNameList(p.getNeedTimeOfDay()), this.dataSource);
    final Array needLocationsArray =
        createSqlArray(enumListToNameList(p.getNeedLocations()), this.dataSource);
    source.addValue("id", p.getId());
    source.addValue("needRecurrence", needRecurrenceArray, Types.ARRAY);
    source.addValue("needTimeOfDay", needTimeOfDayArray, Types.ARRAY);
    source.addValue("needLocations", needLocationsArray, Types.ARRAY);
    source.addValue("otherNeedTimeOfDay", p.getOtherTimeOfDay());
    if (p.getNeighborhood() != null) {
      source.addValue("neighborhoodId", p.getNeighborhood().getId());
    } else {
      source.addValue("neighborhoodId", null);
    }
    source.addValue("otherNeighborhood", p.getOtherNeighborhood());
    source.addValue("additionalInfo", p.getAdditionalInfo());
    source.addValue("whyJoin", p.getWhyJoin());
    // insert children if exist
    if (!p.getChildren().isEmpty()) {
      // delete and reinsert
      deleteChildren(p);
      insertChildren(p);
    }
    this.namedTemplate.query(loadSqlFile("updateParent"), source, new ParentMapper.One());

    needRecurrenceArray.free();
    needTimeOfDayArray.free();
    needLocationsArray.free();

    return p;
  }

  private void deleteChildren(final Parent p) throws IOException {
    final MapSqlParameterSource deleteSource = new MapSqlParameterSource("parent_id", p.getId());
    this.namedTemplate.update(loadSqlFile("deleteChildren"), deleteSource);
  }

  private void insertChildren(final Parent p) throws IOException {
    final Set<Child> newChildren = Sets.newHashSet();

    for (final Child c : p.getChildren()) {
      final MapSqlParameterSource childrenSource = new MapSqlParameterSource();
      childrenSource.addValue("parent_id", p.getId());
      childrenSource.addValue("first_name", c.getFirstName());
      childrenSource.addValue("dob", c.getDob().atStartOfDay());
      childrenSource.addValue("note", c.getNote());
      newChildren.add(this.namedTemplate.query(loadSqlFile("insertChildren"), childrenSource,
          new ParentMapper.ChildMapper()));
    }
    p.setChildren(newChildren);
  }

  public Child getChild(final Integer id) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("id", id);
    return this.namedTemplate.query(loadSqlFile("getChild"), source,
        new ParentMapper.ChildMapper());
  }

  public Set<Child> getChildren(final Integer parentId) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("parent_id", parentId);
    return Sets.newHashSet(
        this.namedTemplate.query(loadSqlFile("getChildren"), source, new ParentMapper.Children()));
  }

  public List<Parent> getAllParents() throws Exception {
    return getAllParents(false);
  }

  public List<Parent> getAllParents(final boolean includeDeleted) throws Exception {
    final SqlParameterSource source = new MapSqlParameterSource("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getAllParents"), source, new ParentMapper.List());
  }

  public Gma createGma(final Gma g) throws Exception {
    final MapSqlParameterSource source = userMapSource(g);

    final Array availabilitiesArray =
        createSqlArray(enumListToNameList(g.getAvailabilities()), this.dataSource);
    final Array careAgesArray =
        createSqlArray(enumListToNameList(g.getCareAges()), this.dataSource);
    final Array careExperiencesArray =
        createSqlArray(enumListToNameList(g.getCareExperiences()), this.dataSource);
    final Array careLocationsArray =
        createSqlArray(enumListToNameList(g.getCareLocations()), this.dataSource);
    final Array demeanorsArray =
        createSqlArray(enumListToNameList(g.getDemeanors()), this.dataSource);
    final Array careTrainings = createSqlArray(g.getCareTrainings(), this.dataSource);

    source.addValue("availabilities", availabilitiesArray, Types.ARRAY);
    source.addValue("otherAvailability", g.getOtherAvailability());
    source.addValue("careAges", careAgesArray, Types.ARRAY);
    source.addValue("careExperiences", careExperiencesArray, Types.ARRAY);
    source.addValue("otherCareExperience", g.getOtherCareExperience());
    source.addValue("careLocations", careLocationsArray, Types.ARRAY);
    source.addValue("demeanors", demeanorsArray, Types.ARRAY);
    source.addValue("otherDemeanor", g.getOtherDemeanor());
    source.addValue("careTrainings", careTrainings, Types.ARRAY);
    if (g.getNeighborhood() != null) {
      source.addValue("neighborhoodId", g.getNeighborhood().getId());
    } else {
      source.addValue("neighborhoodId", null);
    }
    source.addValue("otherNeighborhood", g.getOtherNeighborhood());
    source.addValue("availableOutsideNeighborhood", g.isAvailableOutsideNeighborhood());
    source.addValue("whyCareForKids", g.getWhyCareForKids());
    source.addValue("additionalInfo", g.getAdditionalInfo());
    final Gma gma = this.namedTemplate.query(loadSqlFile("createGma"), source, new GmaMapper.One());

    // free array resources
    availabilitiesArray.free();
    careAgesArray.free();
    careExperiencesArray.free();
    careLocationsArray.free();
    demeanorsArray.free();
    careTrainings.free();

    return gma;
  }

  public Gma getGma(final int id, final boolean includeDeleted) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("user_id", id);
    source.addValue("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getGma"), source, new GmaMapper.One());
  }

  public Gma updateGma(final Gma g) throws Exception {
    final MapSqlParameterSource source = userMapSource(g);
    source.addValue("id", g.getId());
    source.addValue("availabilities",
        createSqlArray(enumListToNameList(g.getAvailabilities()), this.dataSource), Types.ARRAY);
    source.addValue("otherAvailability", g.getOtherAvailability());
    source.addValue("careAges",
        createSqlArray(enumListToNameList(g.getCareAges()), this.dataSource), Types.ARRAY);
    source.addValue("careExperiences",
        createSqlArray(enumListToNameList(g.getCareExperiences()), this.dataSource), Types.ARRAY);
    source.addValue("otherCareExperience", g.getOtherCareExperience());
    source.addValue("careLocations",
        createSqlArray(enumListToNameList(g.getCareLocations()), this.dataSource), Types.ARRAY);
    source.addValue("demeanors",
        createSqlArray(enumListToNameList(g.getDemeanors()), this.dataSource), Types.ARRAY);
    source.addValue("otherDemeanor", g.getOtherDemeanor());
    source.addValue("careTrainings", createSqlArray(g.getCareTrainings(), this.dataSource),
        Types.ARRAY);
    if (g.getNeighborhood() != null) {
      source.addValue("neighborhoodId", g.getNeighborhood().getId());
    } else {
      source.addValue("neighborhoodId", null);
    }
    source.addValue("otherNeighborhood", g.getOtherNeighborhood());
    source.addValue("availableOutsideNeighborhood", g.isAvailableOutsideNeighborhood());
    source.addValue("whyCareForKids", g.getWhyCareForKids());
    source.addValue("additionalInfo", g.getAdditionalInfo());
    return this.namedTemplate.query(loadSqlFile("updateGma"), source, new GmaMapper.One());
  }

  public List<Gma> getAllGmas() throws Exception {
    return getAllGmas(false);
  }

  public List<Gma> getAllGmas(final boolean includeDeleted) throws Exception {
    final SqlParameterSource source = new MapSqlParameterSource("deleted", includeDeleted);
    return this.namedTemplate.query(loadSqlFile("getAllGmas"), source, new GmaMapper.List());
  }

  private BeanPropertySqlParameterSource userSource(final Object user) {
    final BeanPropertySqlParameterSource source = new BeanPropertySqlParameterSource(user);
    source.registerSqlType("userType", java.sql.Types.VARCHAR);
    return source;
  }

  private MapSqlParameterSource userMapSource(final User user) {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("firstName", user.getFirstName());
    source.addValue("lastName", user.getLastName());
    source.addValue("phone", user.getPhone());
    source.addValue("userType", user.getUserType().toString());
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



}
