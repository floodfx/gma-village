package com.gmavillage.model;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;
import java.util.TimeZone;
import java.util.stream.Collectors;

public class CareNeed {

  public enum DeliveryStatusType {
    NEW, QUEUED, DELIVERED
  }

  Integer id;
  Integer parentId;
  Set<Child> children;
  List<CareLocationType> careLocations;
  TimeZone timezone;
  Neighborhood neighborhood;
  String otherNeighborhood;
  OffsetDateTime startTime;
  OffsetDateTime endTime;
  List<Gma> matchingGmas;
  DeliveryStatusType deliveryStatus;

  public Integer getId() {
    return this.id;
  }

  public void setId(final Integer id) {
    this.id = id;
  }

  public Integer getParentId() {
    return this.parentId;
  }

  public void setParentId(final Integer parentId) {
    this.parentId = parentId;
  }

  public Set<Child> getChildren() {
    return this.children;
  }

  public void setChildren(final Set<Child> children) {
    this.children = children;
  }

  public List<CareLocationType> getCareLocations() {
    return this.careLocations;
  }

  public void setCareLocations(final List<CareLocationType> careLocations) {
    this.careLocations = careLocations;
  }

  public void setCareLocationsStrings(final List<String> careLocations) {
    this.careLocations =
        careLocations.stream().map(it -> CareLocationType.valueOf(it)).collect(Collectors.toList());
  }

  public TimeZone getTimezone() {
    return this.timezone;
  }

  public void setTimezone(final TimeZone timezone) {
    this.timezone = timezone;
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

  public OffsetDateTime getStartTime() {
    return this.startTime;
  }

  public void setStartTime(final OffsetDateTime startTime) {
    this.startTime = startTime;
  }

  public OffsetDateTime getEndTime() {
    return this.endTime;
  }

  public void setEndTime(final OffsetDateTime endTime) {
    this.endTime = endTime;
  }

  public List<Gma> getMatchingGmas() {
    return this.matchingGmas;
  }

  public void setMatchingGmas(final List<Gma> matchingGmas) {
    this.matchingGmas = matchingGmas;
  }

  public DeliveryStatusType getDeliveryStatus() {
    return this.deliveryStatus;
  }

  public void setDeliveryStatus(final DeliveryStatusType deliveryStatus) {
    this.deliveryStatus = deliveryStatus;
  }
}
