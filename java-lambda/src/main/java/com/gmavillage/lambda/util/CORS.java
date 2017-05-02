package com.gmavillage.lambda.util;

import com.google.common.collect.ImmutableMap;

public interface CORS {

  public static final ImmutableMap<String, String> HEADERS = ImmutableMap.<String, String>builder() //
      .put("Access-Control-Allow-Credentials", "true") //
      .put("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE") //
      .put("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization")// ,
      .put("Access-Control-Expose-Headers", "Authorization") //
      .build();

}
