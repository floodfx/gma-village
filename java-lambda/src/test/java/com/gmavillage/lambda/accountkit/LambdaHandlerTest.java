package com.gmavillage.lambda.accountkit;

import static com.google.gson.FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES;
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
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.lambda.model.accountkit.AccountKitUser;
import com.gmavillage.lambda.model.accountkit.AccountKitUserAccessToken;
import com.gmavillage.model.Admin;
import com.gmavillage.test.TestUtils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class LambdaHandlerTest {

  TestUtils utils = new TestUtils();

  LambdaProxyEvent accountKitInitSuccess;
  LambdaProxyEvent accountKit404;
  LambdaProxyEvent accountKitAuthSuccess;

  final Gson gson = new GsonBuilder().setFieldNamingPolicy(LOWER_CASE_WITH_UNDERSCORES).create();

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
    final Admin admin = utils.generateAdmin();
    admin.setId(1);
    admin.setAccountKitUserId("akId");
    // mock data for account kit
    final AccountKitUserAccessToken token = new AccountKitUserAccessToken();
    token.setAccessToken("accessToken");
    token.setId("akId");
    token.setTokenRefreshIntervalSec(2592000);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akId");
    akUser.setPhone(new AccountKitUser.Phone("+1" + admin.getPhone(), "1", admin.getPhone()));

    final AccountKitClient accountKit = mock(AccountKitClient.class);
    when(accountKit.accessToken("AUTH_CODE")).thenReturn(token);
    when(accountKit.me("accessToken")).thenReturn(akUser);

    // mock data for database
    final UserDB userDB = mock(UserDB.class);
    when(userDB.getUserByPhone(admin.getPhone())).thenReturn(admin);
    when(userDB.updateUser(admin)).thenReturn(admin);
    when(userDB.getAdmin(admin.getId(), false)).thenReturn(admin);

    // execute test
    final LambdaHandler handler = new LambdaHandler(accountKit, userDB);
    final LambdaProxyOutput out = handler.handleRequest(accountKitAuthSuccess, null);
    // System.out.println("Out" + DebugHelper.toStringLambdaProxyOutput(out));
    assertNotNull(out);
    assertTrue(out.getBody().length() > 0);
    assertEquals(gson.toJson(admin), out.getBody());
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
