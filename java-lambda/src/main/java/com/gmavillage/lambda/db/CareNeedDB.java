package com.gmavillage.lambda.db;

import static java.sql.Types.ARRAY;
import static java.sql.Types.VARCHAR;

import java.sql.Array;
import java.sql.Types;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

import com.gmavillage.model.CareNeed;
import com.gmavillage.model.Child;
import com.gmavillage.model.Gma;

public class CareNeedDB extends Database {

  private final NamedParameterJdbcTemplate namedTemplate;
  private final DataSource dataSource;

  public CareNeedDB() {
    this(postgresDataSource());
  }

  public CareNeedDB(final DataSource dataSource) {
    this.dataSource = dataSource;
    this.namedTemplate = new NamedParameterJdbcTemplate(dataSource);
  }

  public CareNeed createCareNeed(final CareNeed cn) throws Exception {
    final CareNeed savedCareNeed = this.namedTemplate.query(loadSqlFile("createCareNeed"),
        careNeedSqlParams(cn), new CareNeedMapper.One());
    savedCareNeed.setChildren(cn.getChildren());
    savedCareNeed.setMatchingGmas(cn.getMatchingGmas());

    // now insert children
    final MapSqlParameterSource[] childrenSource =
        new MapSqlParameterSource[cn.getChildren().size()];
    int i = 0;
    for (final Child c : cn.getChildren()) {
      childrenSource[i] = new MapSqlParameterSource();
      childrenSource[i].addValue("careneed_id", savedCareNeed.getId());
      childrenSource[i].addValue("child_id", c.getId());
      i++;
    }
    this.namedTemplate.batchUpdate(loadSqlFile("insertCareNeedsChildren"), childrenSource);

    // now insert gmas
    final MapSqlParameterSource[] gmasSource =
        new MapSqlParameterSource[cn.getMatchingGmas().size()];
    i = 0;
    for (final Gma g : cn.getMatchingGmas()) {
      gmasSource[i] = new MapSqlParameterSource();
      gmasSource[i].addValue("careneed_id", savedCareNeed.getId());
      gmasSource[i].addValue("gma_id", g.getId());
      i++;
    }
    this.namedTemplate.batchUpdate(loadSqlFile("insertCareNeedsGmas"), gmasSource);

    return savedCareNeed;
  }


  public CareNeed updateCareNeed(final CareNeed careNeed) throws Exception {
    return this.namedTemplate.query(loadSqlFile("updateCareNeed"), careNeedSource(careNeed),
        new CareNeedMapper.One());
  }

  public List<CareNeed> getAllCareNeeds() throws Exception {
    final SqlParameterSource source = new MapSqlParameterSource();
    return this.namedTemplate.query(loadSqlFile("getAllCareNeeds"), source,
        new CareNeedMapper.List());
  }

  private MapSqlParameterSource careNeedSqlParams(final CareNeed c) throws Exception {
    final MapSqlParameterSource source = new MapSqlParameterSource();
    source.addValue("timezoneName", c.getTimezone().getID());
    source.addValue("parentId", c.getParentId());
    final Array careLocationsArray =
        createSqlArray(enumListToNameList(c.getCareLocations()), this.dataSource);
    source.addValue("careLocations", careLocationsArray, Types.ARRAY);
    source.addValue("neighborhoodId", c.getNeighborhood().getId());
    source.addValue("otherNeighborhood", c.getOtherNeighborhood());
    source.addValue("startTime", c.getStartTime());
    source.addValue("endTime", c.getEndTime());
    source.addValue("deliveryStatus", c.getDeliveryStatus().name());
    return source;
  }

  private BeanPropertySqlParameterSource careNeedSource(final Object careNeed) {
    final BeanPropertySqlParameterSource source = new BeanPropertySqlParameterSource(careNeed);
    source.registerSqlType("userType", VARCHAR);
    source.registerSqlType("careLocations", ARRAY);
    return source;
  }

}
