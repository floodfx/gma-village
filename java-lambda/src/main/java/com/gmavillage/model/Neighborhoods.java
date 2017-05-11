package com.gmavillage.model;

import java.util.List;

import com.google.common.collect.Lists;

public class Neighborhoods {

  public static final Neighborhood UNKNOWN_OAKLAND =
      new Neighborhood(1, Cities.OAKLAND, "Unknown", "UNKNOWN_OAKLAND");
  public static final Neighborhood WEST_OAKLAND =
      new Neighborhood(2, Cities.OAKLAND, "West Oakland", "WEST_OAKLAND");
  public static final Neighborhood EAST_OAKLAND =
      new Neighborhood(3, Cities.OAKLAND, "East Oakland", "EAST_OAKLAND");
  public static final Neighborhood CENTRAL_OAKLAND =
      new Neighborhood(4, Cities.OAKLAND, "Central Oakland", "CENTRAL_OAKLAND");
  public static final Neighborhood NORTH_OAKLAND =
      new Neighborhood(5, Cities.OAKLAND, "North Oakland", "NORTH_OAKLAND");
  public static final Neighborhood BERKELEY =
      new Neighborhood(6, Cities.OAKLAND, "Berkeley", "BERKELEY");
  public static final Neighborhood EMERYVILLE =
      new Neighborhood(7, Cities.OAKLAND, "Emeryville", "EMERYVILLE");
  public static final Neighborhood PIEDMONT =
      new Neighborhood(8, Cities.OAKLAND, "Piedmont", "PIEDMONT");
  public static final Neighborhood ALBANY = new Neighborhood(9, Cities.OAKLAND, "Albany", "ALBANY");
  public static final Neighborhood ALAMEDA =
      new Neighborhood(10, Cities.OAKLAND, "Alameda", "ALAMEDA");
  public static final Neighborhood CASTRO_VALLEY =
      new Neighborhood(11, Cities.OAKLAND, "Castro Valley", "CASTRO_VALLEY");
  public static final Neighborhood OTHER_OAKLAND =
      new Neighborhood(12, Cities.OAKLAND, "Other", "OTHER_OAKLAND");

  public static final List<Neighborhood> NEIGHBORHOODS =
      Lists.newArrayList(WEST_OAKLAND, EAST_OAKLAND, CENTRAL_OAKLAND, NORTH_OAKLAND, BERKELEY,
          EMERYVILLE, PIEDMONT, ALBANY, ALAMEDA, CASTRO_VALLEY, OTHER_OAKLAND);

  public static Neighborhood byLabel(final String label) {
    return Lists
        .newArrayList(WEST_OAKLAND, EAST_OAKLAND, CENTRAL_OAKLAND, NORTH_OAKLAND, BERKELEY,
            EMERYVILLE, PIEDMONT, ALBANY, ALAMEDA, CASTRO_VALLEY, OTHER_OAKLAND)
        .stream().filter(it -> it.label.equals(label)).findFirst().orElse(UNKNOWN_OAKLAND);
  }

}
