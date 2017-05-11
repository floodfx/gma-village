package com.gmavillage.model;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.google.api.client.util.Lists;
import com.google.common.collect.Iterables;

public class Gma extends User {

  private List<TimeOfDayType> availabilities = Lists.newArrayList();
  private String otherAvailability;
  private List<CareAgeType> careAges = Lists.newArrayList();
  private List<CareExperienceType> careExperiences = Lists.newArrayList();
  private String otherCareExperience;
  private List<CareLocationType> careLocations = Lists.newArrayList();
  private List<DemeanorType> demeanors = Lists.newArrayList();
  private String otherDemeanor;
  private List<String> careTrainings = Lists.newArrayList();
  private Neighborhood neighborhood;

  private String otherNeighborhood;
  private boolean availableOutsideNeighborhood;
  private String whyCareForKids;
  private String additionalInfo;

  public Gma() {
    setUserType(UserType.GMA);
  }

  public Gma(final User u) {
    super(u);
    setUserType(UserType.GMA);
  }

  public List<TimeOfDayType> getAvailabilities() {
    return this.availabilities;
  }

  public void setAvailabilities(final List<TimeOfDayType> availabilities) {
    this.availabilities = availabilities;
  }

  public void setAvailabilitiesStrings(final List<String> availabilities) {
    this.availabilities =
        availabilities.stream().map(it -> TimeOfDayType.valueOf(it)).collect(Collectors.toList());
  }

  public String getOtherAvailability() {
    return this.otherAvailability;
  }

  public void setOtherAvailability(final String otherAvailability) {
    this.otherAvailability = otherAvailability;
  }

  public List<CareAgeType> getCareAges() {
    return this.careAges;
  }

  public void setCareAges(final List<CareAgeType> careAges) {
    this.careAges = careAges;
  }

  public void setCareAgesStrings(final List<String> careAges) {
    this.careAges =
        careAges.stream().map(it -> CareAgeType.valueOf(it)).collect(Collectors.toList());
  }

  public List<CareExperienceType> getCareExperiences() {
    return this.careExperiences;
  }

  public void setCareExperiences(final List<CareExperienceType> careExperiences) {
    this.careExperiences = careExperiences;
  }

  public void setCareExperiencesStrings(final List<String> careExperiences) {
    this.careExperiences = careExperiences.stream().map(it -> CareExperienceType.valueOf(it))
        .collect(Collectors.toList());
  }

  public String getOtherCareExperience() {
    return this.otherCareExperience;
  }

  public void setOtherCareExperience(final String otherCareExperience) {
    this.otherCareExperience = otherCareExperience;
  }

  public List<CareLocationType> getCareLocations() {
    return this.careLocations;
  }

  public void setCareLocations(final List<CareLocationType> careLocations) {
    this.careLocations = careLocations;
  }

  public void setCareLocationsStrings(final List<String> careLocations) {
    this.careLocations = careLocations.stream().map(
        it -> "CHILDS_HOME".equals(it) ? CareLocationType.ELSEWHERE : CareLocationType.valueOf(it))
        .collect(Collectors.toList());
  }

  public List<DemeanorType> getDemeanors() {
    return this.demeanors;
  }

  public void setDemeanors(final List<DemeanorType> demeanors) {
    this.demeanors = demeanors;
  }

  public void setDemeanorsStrings(final List<String> demeanors) {
    this.demeanors =
        demeanors.stream().map(it -> DemeanorType.valueOf(it)).collect(Collectors.toList());
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

  public Neighborhood getNeighborhood() {
    return this.neighborhood;
  }

  public void setNeighborhood(final Neighborhood neighborhood) {
    this.neighborhood = neighborhood;
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
        && Objects.equals(neighborhood, u.neighborhood) //
        && Objects.equals(otherNeighborhood, u.otherNeighborhood) //
        && Objects.equals(availableOutsideNeighborhood, u.availableOutsideNeighborhood) //
        && Objects.equals(additionalInfo, u.additionalInfo) //
        && Objects.equals(whyCareForKids, u.whyCareForKids);
  }

}
