package com.gmavillage.lambda.model.accountkit;

public class AccountKitUser {

  private String id;
  private Phone phone;

  public Phone getPhone() {
    return this.phone;
  }

  public void setPhone(final Phone phone) {
    this.phone = phone;
  }

  public String getId() {
    return this.id;
  }

  public void setId(final String id) {
    this.id = id;
  }

  public static class Phone {
    private String number;
    private String countryPrefix;
    private String nationalNumber;

    public Phone() {

    }

    public Phone(final String number, final String countryPrefix, final String nationalNumber) {
      this.number = number;
      this.countryPrefix = countryPrefix;
      this.nationalNumber = nationalNumber;
    }

    public String getNumber() {
      return this.number;
    }

    public void setNumber(final String number) {
      this.number = number;
    }

    public String getCountryPrefix() {
      return this.countryPrefix;
    }

    public void setCountryPrefix(final String countryPrefix) {
      this.countryPrefix = countryPrefix;
    }

    public String getNationalNumber() {
      return this.nationalNumber;
    }

    public void setNationalNumber(final String nationalNumber) {
      this.nationalNumber = nationalNumber;
    }
  }

}
