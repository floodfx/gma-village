package com.gmavillage.lambda.db;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;

import com.gmavillage.model.City;
import com.gmavillage.model.Neighborhood;

public class NeighborhoodMapper {

  public static Neighborhood mapQuery(final ResultSet r) throws SQLException, DataAccessException {
    // check for null neighborhood
    if (r.getObject("neighborhood_id") == null) {
      return null;
    }
    System.out.println("neighborhood_id" + r.getInt("neighborhood_id"));
    final Neighborhood n = new Neighborhood();
    final Integer id = r.getInt("neighborhood_id");
    final String neighborhoodName = r.getString("neighborhood_name");
    final String neighborhoodLabel = r.getString("neighborhood_label");
    System.out.println("neighborhoodName" + neighborhoodName);
    System.out.println("neighborhoodLabel" + neighborhoodLabel);

    final Integer cityId = r.getInt("city_id");
    final String cityName = r.getString("city_name");
    final String cityLabel = r.getString("city_label");
    final String cityState = r.getString("city_state");
    final City city = new City(cityId, cityName, cityLabel, cityState);

    n.setId(id);
    n.setName(neighborhoodName);
    n.setLabel(neighborhoodLabel);
    n.setCity(city);

    return n;
  }

}
