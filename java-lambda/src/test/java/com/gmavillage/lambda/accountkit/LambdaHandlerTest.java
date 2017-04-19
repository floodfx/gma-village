package com.gmavillage.lambda.accountkit;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.InputStreamReader;

import org.junit.Before;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.gmavillage.lambda.util.DebugHelper;
import com.google.common.io.CharStreams;
import com.google.gson.Gson;

public class LambdaHandlerTest {

  LambdaProxyEvent event;

  @Before
  public void loadEvent() throws Exception {
    final String json = CharStreams.toString(new InputStreamReader(
        this.getClass().getClassLoader().getResourceAsStream("test_LambdaProxyEvent.json")));
    System.out.println("JSON" + json);
    final Gson gson = new Gson();
    event = gson.fromJson(json, LambdaProxyEvent.class);
  }

  @Test
  public void test() {
    final LambdaHandler handler = new LambdaHandler();
    final LambdaProxyOutput out = handler.handleRequest(event, null);
    System.out.println("Out" + DebugHelper.toStringLambdaProxyOutput(out));
    assertNotNull(out);
    assertEquals("Hello: GET", out.getBody());

  }

}
