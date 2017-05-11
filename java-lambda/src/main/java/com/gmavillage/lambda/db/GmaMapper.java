package com.gmavillage.lambda.db;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.Gma;

public class GmaMapper {

  public static Gma mapQuery(final ResultSet r) throws SQLException, DataAccessException {
    final UserMapper userMapper = new UserMapper();
    final Gma g = new Gma(userMapper.mapQuery(r));
    System.out.println("Mapping gma:" + g.getId());
    g.setAvailabilitiesStrings(userMapper.asList(r.getArray("availabilities")));
    g.setCareAgesStrings(userMapper.asList(r.getArray("care_ages")));
    g.setCareExperiencesStrings(userMapper.asList(r.getArray("care_experiences")));
    System.out.println("CareLocations" + userMapper.asList(r.getArray("care_locations")));
    g.setCareLocationsStrings(userMapper.asList(r.getArray("care_locations")));
    g.setDemeanorsStrings(userMapper.asList(r.getArray("demeanors")));
    g.setCareTrainings(userMapper.asList(r.getArray("care_trainings")));
    g.setOtherAvailability(r.getString("other_availability"));
    g.setOtherCareExperience(r.getString("other_care_experience"));
    g.setOtherDemeanor(r.getString("other_demeanor"));
    g.setNeighborhood(NeighborhoodMapper.mapQuery(r));
    g.setOtherNeighborhood(r.getString("other_neighborhood"));
    g.setAvailableOutsideNeighborhood(r.getBoolean("available_outside_neighborhood"));
    g.setWhyCareForKids(r.getString("why_care_for_kids"));
    g.setAdditionalInfo(r.getString("additional_info"));


    return g;
  }

  public static class One implements ResultSetExtractor<Gma> {
    @Override
    public Gma extractData(final ResultSet r) throws SQLException, DataAccessException {
      if (r.next()) {
        return mapQuery(r);
      }
      return null;
    }
  }

  public static class List implements RowMapper<Gma> {
    @Override
    public Gma mapRow(final ResultSet r, final int rowNum) throws SQLException {
      return mapQuery(r);
    }
  }

}
