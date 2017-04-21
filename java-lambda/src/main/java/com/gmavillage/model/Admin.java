package com.gmavillage.model;

public class Admin extends User {

  public Admin() {
    super();
    setUserType("admin");
  }

  public Admin(final User u) {
    super(u);
    setUserType("admin");
  }

  @Override
  public boolean equals(final Object o) {
    return super.equals(o);
  }

}
