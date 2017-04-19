package com.gmavillage.lambda.accountkit;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.io.InputStreamReader;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.google.common.io.CharStreams;
import com.google.gson.Gson;

public class LambdaHandlerTest {

  LambdaProxyEvent accountKitInitSuccess;
  LambdaProxyEvent accountKit404;

  @Before
  public void loadEvent() throws Exception {
    accountKitInitSuccess = loadJsonFile("test_LambdaProxyEvent_accountkit_init_success.json");
    accountKit404 = loadJsonFile("test_LambdaProxyEvent_accountkit_404.json");
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
  }

  @Test
  public void testAccoutKit404() {
    final LambdaHandler handler = new LambdaHandler();
    final LambdaProxyOutput out = handler.handleRequest(accountKit404, null);
    // System.out.println("Out" + DebugHelper.toStringLambdaProxyOutput(out));
    assertNotNull(out);
    assertEquals(404, out.getStatusCode());

  }

  private LambdaProxyEvent loadJsonFile(final String name) throws Exception {
    final String json = CharStreams.toString(
        new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(name)));
    return new Gson().fromJson(json, LambdaProxyEvent.class);
  }

}
