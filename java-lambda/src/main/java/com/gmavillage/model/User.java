package com.gmavillage.model;

import java.sql.Timestamp;
import java.util.Objects;

public class User {

  private Integer id;
  private String firstName;
  private String lastName;
  private String phone;
  private UserType userType;
  private boolean active;
  private String profileImageUrl;
  private String accountKitAccessToken;
  private String accountKitUserId;
  private Timestamp accountKitAccessTokenExpiresAt;
  private Timestamp createdOn;
  private Timestamp updatedAt;
  private boolean deleted;
  private boolean acceptedTerms;
  private Integer createdByUser;

  public User() {

  }

  public User(final User u) {
    this.id = u.id;
    this.firstName = u.firstName;
    this.lastName = u.lastName;
    this.phone = u.phone;
    this.userType = u.userType;
    this.active = u.active;
    this.profileImageUrl = u.profileImageUrl;
    this.accountKitAccessToken = u.accountKitAccessToken;
    this.accountKitUserId = u.accountKitUserId;
    this.accountKitAccessTokenExpiresAt = u.accountKitAccessTokenExpiresAt;
    this.createdOn = u.createdOn;
    this.updatedAt = u.updatedAt;
    this.deleted = u.deleted;
    this.acceptedTerms = u.acceptedTerms;
    this.createdByUser = u.createdByUser;
  }

  public Integer getId() {
    return this.id;
  }

  public void setId(final Integer id) {
    this.id = id;
  }

  public String getFirstName() {
    return this.firstName;
  }

  public void setFirstName(final String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  public void setLastName(final String lastName) {
    this.lastName = lastName;
  }

  public String getPhone() {
    return this.phone;
  }

  public void setPhone(final String phone) {
    this.phone = phone;
  }

  public UserType getUserType() {
    return this.userType;
  }

  public void setUserType(final UserType userType) {
    this.userType = userType;
  }

  public void setUserType(final String userType) {
    this.userType = UserType.valueOf(userType);
  }

  public boolean isActive() {
    return this.active;
  }

  public void setActive(final boolean active) {
    this.active = active;
  }

  public String getProfileImageUrl() {
    return this.profileImageUrl;
  }

  public void setProfileImageUrl(final String profileImageUrl) {
    this.profileImageUrl = profileImageUrl;
  }

  public String getAccountKitAccessToken() {
    return this.accountKitAccessToken;
  }

  public void setAccountKitAccessToken(final String accountKitAccessToken) {
    this.accountKitAccessToken = accountKitAccessToken;
  }

  public String getAccountKitUserId() {
    return this.accountKitUserId;
  }

  public void setAccountKitUserId(final String accountKitUserId) {
    this.accountKitUserId = accountKitUserId;
  }

  public Timestamp getAccountKitAccessTokenExpiresAt() {
    return this.accountKitAccessTokenExpiresAt;
  }

  public void setAccountKitAccessTokenExpiresAt(final Timestamp accountKitAccessTokenExpiresAt) {
    this.accountKitAccessTokenExpiresAt = accountKitAccessTokenExpiresAt;
  }

  public Timestamp getCreatedOn() {
    return this.createdOn;
  }

  public void setCreatedOn(final Timestamp createdOn) {
    this.createdOn = createdOn;
  }

  public Timestamp getUpdatedAt() {
    return this.updatedAt;
  }

  public void setUpdatedAt(final Timestamp updatedAt) {
    this.updatedAt = updatedAt;
  }

  public boolean isDeleted() {
    return this.deleted;
  }

  public void setDeleted(final boolean deleted) {
    this.deleted = deleted;
  }

  public boolean isAcceptedTerms() {
    return this.acceptedTerms;
  }

  public void setAcceptedTerms(final boolean acceptedTerms) {
    this.acceptedTerms = acceptedTerms;
  }

  public Integer getCreatedByUser() {
    return this.createdByUser;
  }

  public void setCreatedByUser(final Integer createdByUser) {
    this.createdByUser = createdByUser;
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
    final User u = (User) o;
    // field comparison
    return Objects.equals(id, u.id) //
        && Objects.equals(firstName, u.firstName) //
        && Objects.equals(lastName, u.lastName) //
        && Objects.equals(phone, u.phone) //
        && Objects.equals(userType, u.userType) //
        && Objects.equals(active, u.active) //
        && Objects.equals(profileImageUrl, u.profileImageUrl) //
        && Objects.equals(accountKitAccessToken, u.accountKitAccessToken) //
        && Objects.equals(accountKitUserId, u.accountKitUserId) //
        && Objects.equals(accountKitAccessTokenExpiresAt, u.accountKitAccessTokenExpiresAt) //
        && Objects.equals(createdOn, u.createdOn) //
        && Objects.equals(updatedAt, u.updatedAt) //
        && Objects.equals(deleted, u.deleted) //
        && Objects.equals(acceptedTerms, u.acceptedTerms);
  }

}
