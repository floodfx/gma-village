package com.gmavillage.model;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.google.api.client.util.Lists;
import com.google.api.client.util.Sets;
import com.google.common.collect.Iterables;

public class Parent extends User {

  private List<RecurrenceType> needRecurrence = Lists.newArrayList();
  private List<TimeOfDayType> needTimeOfDay = Lists.newArrayList();
  private String otherTimeOfDay;
  private List<CareLocationType> needLocations = Lists.newArrayList();
  private Neighborhood neighborhood;
  private String otherNeighborhood;
  private String whyJoin;
  private String additionalInfo;
  private Set<Child> children = Sets.newHashSet();

  public Parent() {
    setUserType(UserType.PARENT);
  }

  public Parent(final User u) {
    super(u);
    setUserType(UserType.PARENT);
  }

  public List<RecurrenceType> getNeedRecurrence() {
    return this.needRecurrence;
  }

  public void setNeedRecurrence(final List<RecurrenceType> needRecurrence) {
    this.needRecurrence = needRecurrence;
  }

  public void setNeedRecurrenceStrings(final List<String> needRecurrence) {
    this.needRecurrence =
        needRecurrence.stream().map(it -> RecurrenceType.valueOf(it)).collect(Collectors.toList());
  }

  public List<TimeOfDayType> getNeedTimeOfDay() {
    return this.needTimeOfDay;
  }

  public void setNeedTimeOfDay(final List<TimeOfDayType> needTimeOfDay) {
    this.needTimeOfDay = needTimeOfDay;
  }

  public void setNeedTimeOfDayStrings(final List<String> needTimeOfDay) {
    this.needTimeOfDay =
        needTimeOfDay.stream().map(it -> TimeOfDayType.valueOf(it)).collect(Collectors.toList());
  }

  public String getOtherTimeOfDay() {
    return this.otherTimeOfDay;
  }

  public void setOtherTimeOfDay(final String otherTimeOfDay) {
    this.otherTimeOfDay = otherTimeOfDay;
  }

  public List<CareLocationType> getNeedLocations() {
    return this.needLocations;
  }

  public void setNeedLocations(final List<CareLocationType> needLocations) {
    this.needLocations = needLocations;
  }

  public void setNeedLocationsStrings(final List<String> needLocations) {
    this.needLocations =
        needLocations.stream().map(it -> CareLocationType.valueOf(it)).collect(Collectors.toList());
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

  public Set<Child> getChildren() {
    return this.children;
  }

  public void setChildren(final Set<Child> children) {
    this.children = children;
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
    final Comparator<Child> childSorter = (o1, o2) -> o1.getId() - o2.getId();
    final List<Child> thisChildrenList = Lists.newArrayList(children);
    thisChildrenList.sort(childSorter);
    final List<Child> otherChildrenList = Lists.newArrayList(u.children);
    otherChildrenList.sort(childSorter);
    return super.equals(o) //
        && Iterables.elementsEqual(needRecurrence, u.needRecurrence) //
        && Iterables.elementsEqual(needTimeOfDay, u.needTimeOfDay) //
        && Objects.equals(otherTimeOfDay, u.otherTimeOfDay) //
        && Iterables.elementsEqual(needLocations, u.needLocations) //
        && Objects.equals(neighborhood, u.neighborhood) //
        && Objects.equals(otherNeighborhood, u.otherNeighborhood) //
        && Objects.equals(additionalInfo, u.additionalInfo) //
        && Objects.equals(whyJoin, u.whyJoin) //
        && Iterables.elementsEqual(thisChildrenList, otherChildrenList);
  }

  @Override
  public String toString() {
    return ToStringBuilder.reflectionToString(this);
  }

}
