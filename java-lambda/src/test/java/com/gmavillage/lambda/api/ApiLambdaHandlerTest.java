package com.gmavillage.lambda.api;

import org.junit.Assert;
import org.junit.Test;

public class ApiLambdaHandlerTest {

  ApiLambdaHandler handler = new ApiLambdaHandler();

  @Test
  public void testMatches() {
    Assert.assertTrue(handler.regexMatched("users", handler.USERS_MATCHER));
    Assert.assertTrue(handler.regexMatched("gmas", handler.USERS_MATCHER));
    Assert.assertTrue(handler.regexMatched("parents", handler.USERS_MATCHER));
    Assert.assertTrue(handler.regexMatched("admins", handler.USERS_MATCHER));

    Assert.assertTrue(handler.regexMatched("users/1", handler.USERS_MATCHER));
    Assert.assertTrue(handler.regexMatched("users/100", handler.USERS_MATCHER));
    Assert.assertTrue(handler.regexMatched("gmas/1", handler.USERS_MATCHER));
    Assert.assertTrue(handler.regexMatched("gmas/100", handler.USERS_MATCHER));
    Assert.assertTrue(handler.regexMatched("parents/1", handler.USERS_MATCHER));
    Assert.assertTrue(handler.regexMatched("parents/100", handler.USERS_MATCHER));
    Assert.assertTrue(handler.regexMatched("admins/1", handler.USERS_MATCHER));
    Assert.assertTrue(handler.regexMatched("admins/100", handler.USERS_MATCHER));

    Assert.assertFalse(handler.regexMatched("users/a", handler.USERS_MATCHER));
    Assert.assertFalse(handler.regexMatched("gmas/b", handler.USERS_MATCHER));
    Assert.assertFalse(handler.regexMatched("parents/c", handler.USERS_MATCHER));
    Assert.assertFalse(handler.regexMatched("admins/d", handler.USERS_MATCHER));
  }

}
