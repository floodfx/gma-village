package com.gmavillage.model;

public class Admin extends User {

  public Admin() {
    setUserType(UserType.ADMIN);
  }

  public Admin(final User u) {
    super(u);
    setUserType(UserType.ADMIN);
  }


}
