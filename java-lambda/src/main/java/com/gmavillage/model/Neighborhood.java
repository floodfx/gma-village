package com.gmavillage.model;

import java.util.Objects;

public class Neighborhood {

  Integer id;
  City city;
  String name;
  String label;

  public Neighborhood() {}

  public Neighborhood(final Integer id, final City city, final String name, final String label) {
    this.id = id;
    this.city = city;
    this.name = name;
    this.label = label;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(final Integer id) {
    this.id = id;
  }

  public City getCity() {
    return this.city;
  }

  public void setCity(final City city) {
    this.city = city;
  }

  public String getName() {
    return this.name;
  }

  public void setName(final String name) {
    this.name = name;
  }

  public String getLabel() {
    return this.label;
  }

  public void setLabel(final String label) {
    this.label = label;
  }

  @Override
  public boolean equals(final Object o) {
    // self check
    if (this == o) {
      return true;
    }
    // null check
    if (o == null) {
      return false;
    }
    // type check and cast
    if (getClass() != o.getClass()) {
      return false;
    }
    final Neighborhood n = (Neighborhood) o;
    // field comparison
    return Objects.equals(id, n.id) //
        && Objects.equals(city, n.city) //
        && Objects.equals(name, n.name) //
        && Objects.equals(label, n.label);
  }

}
