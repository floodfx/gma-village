package com.gmavillage.lambda.api;

import java.util.Map;

public class UnauthorizedExeception extends Exception {

  private final int status;
  private final Map<String, String> headers;
  private final String body;

  public UnauthorizedExeception(final int status, final Map<String, String> headers,
      final String body) {
    this.status = status;
    this.headers = headers;
    this.body = body;
  }

  public UnauthorizedExeception(final int status, final Map<String, String> headers) {
    this(status, headers, null);
  }

  public UnauthorizedExeception(final int status) {
    this(status, null, null);
  }

  public int getStatus() {
    return this.status;
  }

  public Map<String, String> getHeaders() {
    return this.headers;
  }

  public String getBody() {
    return this.body;
  }

}
