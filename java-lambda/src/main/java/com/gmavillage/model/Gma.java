package com.gmavillage.model;

import java.util.List;
import java.util.Objects;

import com.google.api.client.util.Lists;
import com.google.common.collect.Iterables;

public class Gma extends User {

  private List<String> availabilities = Lists.newArrayList();
  private String otherAvailability;
  private List<String> careAges = Lists.newArrayList();
  private List<String> careExperiences = Lists.newArrayList();
  private String otherCareExperience;
  private List<String> careLocations = Lists.newArrayList();
  private List<String> demeanors = Lists.newArrayList();
  private String otherDemeanor;
  private List<String> careTrainings = Lists.newArrayList();
  private Integer neighborhoodId;
  private String otherNeighborhood;
  private boolean availableOutsideNeighborhood;
  private String whyCareForKids;
  private String additionalInfo;

  public Gma() {
    super();
    setUserType("gma");
  }

  public Gma(final User u) {
    super(u);
    setUserType("gma");
  }

  public List<String> getAvailabilities() {
    return this.availabilities;
  }

  public void setAvailabilities(final List<String> availabilities) {
    this.availabilities = availabilities;
  }

  public String getOtherAvailability() {
    return this.otherAvailability;
  }

  public void setOtherAvailability(final String otherAvailability) {
    this.otherAvailability = otherAvailability;
  }

  public List<String> getCareAges() {
    return this.careAges;
  }

  public void setCareAges(final List<String> careAges) {
    this.careAges = careAges;
  }

  public List<String> getCareExperiences() {
    return this.careExperiences;
  }

  public void setCareExperiences(final List<String> careExperiences) {
    this.careExperiences = careExperiences;
  }

  public String getOtherCareExperience() {
    return this.otherCareExperience;
  }

  public void setOtherCareExperience(final String otherCareExperience) {
    this.otherCareExperience = otherCareExperience;
  }

  public List<String> getCareLocations() {
    return this.careLocations;
  }

  public void setCareLocations(final List<String> careLocations) {
    this.careLocations = careLocations;
  }

  public List<String> getDemeanors() {
    return this.demeanors;
  }

  public void setDemeanors(final List<String> demeanors) {
    this.demeanors = demeanors;
  }

  public String getOtherDemeanor() {
    return this.otherDemeanor;
  }

  public void setOtherDemeanor(final String otherDemeanor) {
    this.otherDemeanor = otherDemeanor;
  }

  public List<String> getCareTrainings() {
    return this.careTrainings;
  }

  public void setCareTrainings(final List<String> careTrainings) {
    this.careTrainings = careTrainings;
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

  public boolean isAvailableOutsideNeighborhood() {
    return this.availableOutsideNeighborhood;
  }

  public void setAvailableOutsideNeighborhood(final boolean availableOutsideNeighborhood) {
    this.availableOutsideNeighborhood = availableOutsideNeighborhood;
  }

  public String getWhyCareForKids() {
    return this.whyCareForKids;
  }

  public void setWhyCareForKids(final String whyCareForKids) {
    this.whyCareForKids = whyCareForKids;
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
    final Gma u = (Gma) o;
    // field comparison
    return super.equals(o) //
        && Iterables.elementsEqual(availabilities, u.availabilities) //
        && Objects.equals(otherAvailability, u.otherAvailability) //
        && Iterables.elementsEqual(careAges, u.careAges) //
        && Iterables.elementsEqual(careExperiences, u.careExperiences) //
        && Objects.equals(otherCareExperience, u.otherCareExperience) //
        && Iterables.elementsEqual(careLocations, u.careLocations) //
        && Iterables.elementsEqual(demeanors, u.demeanors) //
        && Objects.equals(otherDemeanor, u.otherDemeanor) //
        && Iterables.elementsEqual(careTrainings, u.careTrainings) //
        && Objects.equals(neighborhoodId, u.neighborhoodId) //
        && Objects.equals(otherNeighborhood, u.otherNeighborhood) //
        && Objects.equals(availableOutsideNeighborhood, u.availableOutsideNeighborhood) //
        && Objects.equals(additionalInfo, u.additionalInfo) //
        && Objects.equals(whyCareForKids, u.whyCareForKids);
  }

}
