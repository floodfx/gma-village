package com.gmavillage.model;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class Admin extends User {

  public Admin() {
    setUserType(UserType.ADMIN);
  }

  public Admin(final User u) {
    super(u);
    setUserType(UserType.ADMIN);
  }

  @Override
  public String toString() {
    return ToStringBuilder.reflectionToString(this);
  }


}
