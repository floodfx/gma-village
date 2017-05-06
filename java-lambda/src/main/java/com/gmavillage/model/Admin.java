package com.gmavillage.model;

public class Admin extends User {

  public Admin() {
    this(null);
  }

  public Admin(final User u) {
    super(u);
    setUserType(UserType.ADMIN);
  }


}
