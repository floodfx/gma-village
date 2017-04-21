package com.gmavillage.lambda.db;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.Gma;

public class GmaMapper implements RowMapper<Gma> {

  @Override
  public Gma mapRow(final ResultSet r, final int rowNum) throws SQLException {
    final UserMapper userMapper = new UserMapper();
    final Gma g = new Gma(userMapper.mapRow(r, rowNum));
    g.setAvailabilities(userMapper.asList(r.getArray("availabilities")));
    g.setCareAges(userMapper.asList(r.getArray("care_ages")));
    g.setCareExperiences(userMapper.asList(r.getArray("care_experiences")));
    g.setCareLocations(userMapper.asList(r.getArray("care_locations")));
    g.setDemeanors(userMapper.asList(r.getArray("demeanors")));
    g.setCareTrainings(userMapper.asList(r.getArray("care_trainings")));
    g.setOtherAvailability(r.getString("other_availability"));
    g.setOtherCareExperience(r.getString("other_care_experience"));
    g.setOtherDemeanor(r.getString("other_demeanor"));
    g.setNeighborhoodId(Integer.getInteger(r.getString("neighborhood_id")));
    g.setOtherAvailability(r.getString("other_neighborhood"));
    g.setAvailableOutsideNeighborhood(r.getBoolean("available_outside_neighborhood"));
    g.setWhyCareForKids(r.getString("why_care_for_kids"));
    g.setAdditionalInfo(r.getString("additional_info"));
    return g;
  }

}
