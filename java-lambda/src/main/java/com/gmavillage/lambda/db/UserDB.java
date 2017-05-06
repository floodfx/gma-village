package com.gmavillage.lambda.db;

import java.sql.Array;
import java.sql.Connection;
import java.sql.Types;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    final Array needRecurrenceArray = createSqlArray(enumListToNameList(p.getNeedRecurrence()));
    final Array needTimeOfDayArray = createSqlArray(enumListToNameList(p.getNeedTimeOfDay()));
    final Array needLocationsArray = createSqlArray(enumListToNameList(p.getNeedLocations()));
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
      final MapSqlParameterSource[] childrenSource =
          new MapSqlParameterSource[p.getChildren().size()];
      int i = 0;
      for (final Child c : p.getChildren()) {
        childrenSource[i] = new MapSqlParameterSource();
        childrenSource[i].addValue("parent_id", newP.getId());
        childrenSource[i].addValue("first_name", c.getFirstName());
        childrenSource[i].addValue("dob", c.getDob());
        childrenSource[i].addValue("note", c.getNote());
        i++;
      }
      this.namedTemplate.batchUpdate(loadSqlFile("insertChildren"), childrenSource);
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
    final Array needRecurrenceArray = createSqlArray(enumListToNameList(p.getNeedRecurrence()));
    final Array needTimeOfDayArray = createSqlArray(enumListToNameList(p.getNeedTimeOfDay()));
    final Array needLocationsArray = createSqlArray(enumListToNameList(p.getNeedLocations()));
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
      // delete existing children
      final MapSqlParameterSource deleteSource = new MapSqlParameterSource("parent_id", p.getId());
      final int deletes = this.namedTemplate.update(loadSqlFile("deleteChildren"), deleteSource);


      // now insert
      final MapSqlParameterSource[] childrenSource =
          new MapSqlParameterSource[p.getChildren().size()];
      int i = 0;
      for (final Child c : p.getChildren()) {
        childrenSource[i] = new MapSqlParameterSource();
        childrenSource[i].addValue("parent_id", p.getId());
        childrenSource[i].addValue("first_name", c.getFirstName());
        childrenSource[i].addValue("dob", c.getDob().atStartOfDay());
        childrenSource[i].addValue("note", c.getNote());
        i++;
      }
      this.namedTemplate.batchUpdate(loadSqlFile("insertChildren"), childrenSource);
    }
    this.namedTemplate.query(loadSqlFile("updateParent"), source, new ParentMapper.One());

    needRecurrenceArray.free();
    needTimeOfDayArray.free();
    needLocationsArray.free();

    return p;
  }

  public Set<Child> getChildren(final Integer id) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("parent_id", id);
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

    final Array availabilitiesArray = createSqlArray(enumListToNameList(g.getAvailabilities()));
    final Array careAgesArray = createSqlArray(enumListToNameList(g.getCareAges()));
    final Array careExperiencesArray = createSqlArray(enumListToNameList(g.getCareExperiences()));
    final Array careLocationsArray = createSqlArray(enumListToNameList(g.getCareLocations()));
    final Array demeanorsArray = createSqlArray(enumListToNameList(g.getDemeanors()));

    source.addValue("availabilities", availabilitiesArray, Types.ARRAY);
    source.addValue("otherAvailability", g.getOtherAvailability());
    source.addValue("careAges", careAgesArray, Types.ARRAY);
    source.addValue("careExperiences", careExperiencesArray, Types.ARRAY);
    source.addValue("otherCareExperience", g.getOtherCareExperience());
    source.addValue("careLocations", careLocationsArray, Types.ARRAY);
    source.addValue("demeanors", demeanorsArray, Types.ARRAY);
    source.addValue("otherDemeanor", g.getOtherDemeanor());
    source.addValue("careTrainings", createSqlArray(g.getCareTrainings()), Types.ARRAY);
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
    source.addValue("availabilities", createSqlArray(enumListToNameList(g.getAvailabilities())),
        Types.ARRAY);
    source.addValue("otherAvailability", g.getOtherAvailability());
    source.addValue("careAges", createSqlArray(enumListToNameList(g.getCareAges())), Types.ARRAY);
    source.addValue("careExperiences", createSqlArray(enumListToNameList(g.getCareExperiences())),
        Types.ARRAY);
    source.addValue("otherCareExperience", g.getOtherCareExperience());
    source.addValue("careLocations", createSqlArray(enumListToNameList(g.getCareLocations())),
        Types.ARRAY);
    source.addValue("demeanors", createSqlArray(enumListToNameList(g.getDemeanors())), Types.ARRAY);
    source.addValue("otherDemeanor", g.getOtherDemeanor());
    source.addValue("careTrainings", createSqlArray(g.getCareTrainings()), Types.ARRAY);
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

  private List<String> enumListToNameList(final List<? extends Enum> enumList) {
    return enumList.stream().map(it -> it.name()).collect(Collectors.toList());
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

  private Array createSqlArray(final List<String> list) throws Exception {
    return createSqlArray(list, "varchar");
  }


  private Array createSqlArray(final List<String> list, final String type) throws Exception {
    Array stringArray = null;
    Connection c = null;
    try {
      c = dataSource.getConnection();
      stringArray = c.createArrayOf(type, list.toArray());
    } finally {
      if (c != null) {
        c.close();
      }
    }
    return stringArray;
  }

}
