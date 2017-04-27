package com.gmavillage.lambda.accountkit;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.gmavillage.test.TestUtils;
import com.google.common.collect.Maps;
import com.google.gson.Gson;

public class LambdaHandlerTest {

  TestUtils utils = new TestUtils();

  LambdaProxyEvent accountKitInitSuccess;
  LambdaProxyEvent accountKit404;
  LambdaProxyEvent accountKitAuthSuccess;

  @Before
  public void loadEvent() throws Exception {
    accountKitInitSuccess =
        utils.loadJsonFile("test_LambdaProxyEvent_accountkit_init_success.json");
    accountKit404 = utils.loadJsonFile("test_LambdaProxyEvent_accountkit_404.json");
    accountKitAuthSuccess =
        utils.loadJsonFile("test_LambdaProxyEvent_accountkit_authorize_success.json");
  }

  @Test
  public void testAccoutKitInitSuccess() {
    final LambdaHandler handler = new LambdaHandler();
    final LambdaProxyOutput out = handler.handleRequest(accountKitInitSuccess, null);
    // System.out.println("Out" + DebugHelper.toStringLambdaProxyOutput(out));
    assertNotNull(out);
    assertTrue(out.getBody().length() > 0);
    final Gson gson = new Gson();
    @SuppressWarnings("unchecked")
    final Map<String, String> json = gson.fromJson(out.getBody(), Map.class);
    assertEquals(json.get("appId"), "AK_APP_ID");
    assertEquals(json.get("csrf"), "CSRF");
    assertEquals(json.get("version"), "AK_APP_VERSION");
    assertEquals(out.getHeaders().size(), 3);
    assertEquals(out.getHeaders().get("Access-Control-Allow-Credentials"), "true");
    assertEquals(out.getHeaders().get("Access-Control-Allow-Methods"),
        "OPTIONS, GET, POST, PUT, DELETE");
    assertEquals(out.getHeaders().get("Access-Control-Allow-Origin"), "http://localhost:3000");
  }

  @Test
  public void testAccoutKitAuthSuccess() throws Exception {
    final Map<String, String> expectedObj = Maps.newHashMap();
    expectedObj.put("id", "userId");
    expectedObj.put("access_token", "accessToken");
    expectedObj.put("token_refresh_interval_sec", "2592000");
    final Gson gson = new Gson();
    final String json = gson.toJson(expectedObj);
    final AccountKitClient accountKit = mock(AccountKitClient.class);
    when(accountKit.accessTokenAsString("AUTH_CODE")).thenReturn(json);

    final LambdaHandler handler = new LambdaHandler(accountKit);
    final LambdaProxyOutput out = handler.handleRequest(accountKitAuthSuccess, null);
    // System.out.println("Out" + DebugHelper.toStringLambdaProxyOutput(out));
    assertNotNull(out);
    assertTrue(out.getBody().length() > 0);
    assertEquals(out.getBody(), json);
  }

  @Test
  public void testAccoutKit404() {
    final LambdaHandler handler = new LambdaHandler();
    final LambdaProxyOutput out = handler.handleRequest(accountKit404, null);
    // System.out.println("Out" + DebugHelper.toStringLambdaProxyOutput(out));
    assertNotNull(out);
    assertEquals(404, out.getStatusCode());

  }



}
