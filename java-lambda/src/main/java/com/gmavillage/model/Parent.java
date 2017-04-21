package com.gmavillage.model;

import java.util.List;
import java.util.Objects;

import com.google.common.collect.Iterables;

public class Parent extends User {

  private List<String> needRecurrence;
  private List<String> needTimeOfDay;
  private String otherTimeOfDay;
  private List<String> needLocations;
  private Integer neighborhoodId;
  private String otherNeighborhood;
  private String whyJoin;
  private String additionalInfo;

  public Parent() {
    super();
  }

  public Parent(final User u) {
    super(u);
  }

  public List<String> getNeedRecurrence() {
    return this.needRecurrence;
  }

  public void setNeedRecurrence(final List<String> needRecurrence) {
    this.needRecurrence = needRecurrence;
  }

  public List<String> getNeedTimeOfDay() {
    return this.needTimeOfDay;
  }

  public void setNeedTimeOfDay(final List<String> needTimeOfDay) {
    this.needTimeOfDay = needTimeOfDay;
  }

  public String getOtherTimeOfDay() {
    return this.otherTimeOfDay;
  }

  public void setOtherTimeOfDay(final String otherTimeOfDay) {
    this.otherTimeOfDay = otherTimeOfDay;
  }

  public List<String> getNeedLocations() {
    return this.needLocations;
  }

  public void setNeedLocations(final List<String> needLocations) {
    this.needLocations = needLocations;
  }

  public Integer getNeighborhoodId() {
    return this.neighborhoodId;
  }

  public void setNeighborhoodId(final Integer neighborhoodId) {
    this.neighborhoodId = neighborhoodId;
  }

  public String getOtherNeighborhood() {
    return this.otherNeighborhood;
  }

  public void setOtherNeighborhood(final String otherNeighborhood) {
    this.otherNeighborhood = otherNeighborhood;
  }

  public String getWhyJoin() {
    return this.whyJoin;
  }

  public void setWhyJoin(final String whyJoin) {
    this.whyJoin = whyJoin;
  }

  public String getAdditionalInfo() {
    return this.additionalInfo;
  }

  public void setAdditionalInfo(final String additionalInfo) {
    this.additionalInfo = additionalInfo;
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
    final Parent u = (Parent) o;
    // field comparison
    return super.equals(o) //
        && Iterables.elementsEqual(needRecurrence, u.needRecurrence) //
        && Iterables.elementsEqual(needTimeOfDay, u.needTimeOfDay) //
        && Objects.equals(otherTimeOfDay, u.otherTimeOfDay) //
        && Iterables.elementsEqual(needLocations, u.needLocations) //
        && Objects.equals(neighborhoodId, u.neighborhoodId) //
        && Objects.equals(otherNeighborhood, u.otherNeighborhood) //
        && Objects.equals(additionalInfo, u.additionalInfo) //
        && Objects.equals(whyJoin, u.whyJoin);
  }

}
