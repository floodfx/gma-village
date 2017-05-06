package com.gmavillage.model;

import java.util.Objects;

public class City {

  Integer id;
  String name;
  String label;
  String state;

  public City() {}

  public City(final Integer id, final String name, final String label, final String state) {
    this.id = id;
    this.name = name;
    this.label = label;
    this.state = state;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(final Integer id) {
    this.id = id;
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

  public String getState() {
    return this.state;
  }

  public void setState(final String state) {
    this.state = state;
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
    final City c = (City) o;
    // field comparison
    return Objects.equals(id, c.id) //
        && Objects.equals(state, c.state) //
        && Objects.equals(name, c.name) //
        && Objects.equals(label, c.label);
  }

}
