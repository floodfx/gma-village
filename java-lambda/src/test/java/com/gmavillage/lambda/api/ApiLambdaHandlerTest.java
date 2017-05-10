package com.gmavillage.lambda.api;

import org.junit.Assert;
import org.junit.Test;

public class ApiLambdaHandlerTest {

  ApiLambdaHandler handler = new ApiLambdaHandler();

  @Test
  public void testMatches() {
    Assert.assertTrue(handler.proxyPathSupported("users"));
    Assert.assertTrue(handler.proxyPathSupported("gmas"));
    Assert.assertTrue(handler.proxyPathSupported("parents"));
    Assert.assertTrue(handler.proxyPathSupported("admins"));

    Assert.assertTrue(handler.proxyPathSupported("users/1"));
    Assert.assertTrue(handler.proxyPathSupported("users/100"));
    Assert.assertTrue(handler.proxyPathSupported("gmas/1"));
    Assert.assertTrue(handler.proxyPathSupported("gmas/100"));
    Assert.assertTrue(handler.proxyPathSupported("parents/1"));
    Assert.assertTrue(handler.proxyPathSupported("parents/100"));
    Assert.assertTrue(handler.proxyPathSupported("admins/1"));
    Assert.assertTrue(handler.proxyPathSupported("admins/100"));
  }

}
