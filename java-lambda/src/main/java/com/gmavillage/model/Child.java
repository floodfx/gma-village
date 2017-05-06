package com.gmavillage.model;

import java.time.LocalDate;
import java.util.Objects;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class Child {

  String firstName;
  LocalDate dob;
  String note;

  public String getFirstName() {
    return this.firstName;
  }

  public void setFirstName(final String firstName) {
    this.firstName = firstName;
  }

  public LocalDate getDob() {
    return this.dob;
  }

  public void setDob(final LocalDate dob) {
    this.dob = dob;
  }

  public String getNote() {
    return this.note;
  }

  public void setNote(final String note) {
    this.note = note;
  }

  @Override
  public String toString() {
    return ToStringBuilder.reflectionToString(this);
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
    final Child c = (Child) o;
    // field comparison

    return Objects.equals(firstName, c.firstName) //
        && Objects.equals(dob, c.dob) //
        && Objects.equals(note, c.note);
  }

}
