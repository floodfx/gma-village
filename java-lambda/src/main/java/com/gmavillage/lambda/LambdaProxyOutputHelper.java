package com.gmavillage.lambda;

import java.util.Map;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.gmavillage.lambda.util.CORS;
import com.google.common.collect.Maps;

public class LambdaProxyOutputHelper implements CORS {

  public static LambdaProxyOutput success(final String body, final String origin) {
    final Map<String, String> headers = Maps.newHashMap(CORS.HEADERS);
    headers.put("Access-Control-Allow-Origin", origin);
    final LambdaProxyOutput success = new LambdaProxyOutput(200, headers, body);
    System.out.println("Returning Success" + ToStringBuilder.reflectionToString(success));
    return success;
  }

  public static LambdaProxyOutput error(final int status, final String body, final String origin) {
    final Map<String, String> headers = Maps.newHashMap(CORS.HEADERS);
    headers.put("Access-Control-Allow-Origin", origin);
    System.err.println("Returning Error with Body" + body);
    return new LambdaProxyOutput(status, headers, body);
  }

  public static LambdaProxyOutput error(final String error, final String origin) {
    return error(200, error, origin);
  }

  public static LambdaProxyOutput error401Unauthorized() {
    return new LambdaProxyOutput(401);
  }

  public static LambdaProxyOutput error403Forbidden() {
    return new LambdaProxyOutput(403);
  }

  public static LambdaProxyOutput error404() {
    return new LambdaProxyOutput(404);
  }

}
