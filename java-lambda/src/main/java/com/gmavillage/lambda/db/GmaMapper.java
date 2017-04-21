package com.gmavillage.lambda.db;

import java.sql.Array;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;

import com.gmavillage.model.Gma;

public class GmaMapper implements RowMapper<Gma> {

  @Override
  public Gma mapRow(final ResultSet r, final int rowNum) throws SQLException {
    final Gma g = new Gma(new UserMapper().mapRow(r, rowNum));
    g.setAvailabilities(asList(r.getArray("availabilities")));
    g.setCareAges(asList(r.getArray("care_ages")));
    g.setCareExperiences(asList(r.getArray("care_experiences")));
    g.setCareLocations(asList(r.getArray("care_locations")));
    g.setDemeanors(asList(r.getArray("demeanors")));
    g.setCareTrainings(asList(r.getArray("care_trainings")));
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

  private List<String> asList(final Array vals) throws SQLException {
    return Arrays.asList((String[]) vals.getArray());
  }

}
