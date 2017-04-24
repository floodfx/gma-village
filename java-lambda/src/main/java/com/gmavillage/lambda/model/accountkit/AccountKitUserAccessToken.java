package com.gmavillage.lambda.model.accountkit;

public class AccountKitUserAccessToken {

  private String id;
  private String accessToken;
  private Integer tokenRefreshIntervalSec;

  public String getId() {
    return this.id;
  }

  public void setId(final String id) {
    this.id = id;
  }

  public String getAccessToken() {
    return this.accessToken;
  }

  public void setAccessToken(final String accessToken) {
    this.accessToken = accessToken;
  }

  public Integer getTokenRefreshIntervalSec() {
    return this.tokenRefreshIntervalSec;
  }

  public void setTokenRefreshIntervalSec(final Integer tokenRefreshIntervalSec) {
    this.tokenRefreshIntervalSec = tokenRefreshIntervalSec;
  }

}
