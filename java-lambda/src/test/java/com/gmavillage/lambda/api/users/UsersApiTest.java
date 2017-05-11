package com.gmavillage.lambda.api.users;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.gmavillage.lambda.accountkit.AccountKitClient;
import com.gmavillage.lambda.api.ApiLambdaHandler;
import com.gmavillage.lambda.api.UnauthorizedExeception;
import com.gmavillage.lambda.api.authorizer.ApiAuthorizer;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.lambda.model.accountkit.AccountKitUser;
import com.gmavillage.model.Admin;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Parent;
import com.gmavillage.model.User;
import com.gmavillage.model.json.GsonFactory;
import com.gmavillage.test.TestUtils;
import com.google.api.client.util.Maps;
import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class UsersApiTest {

  TestUtils testUtils = new TestUtils();

  LambdaProxyEvent getUsersSuccess;
  LambdaProxyEvent getGmasSuccess;
  LambdaProxyEvent getUsers1Success;
  LambdaProxyEvent postUserSuccess;
  LambdaProxyEvent putUserSuccess;
  LambdaProxyEvent deleteUserSuccess;
  LambdaProxyEvent error404;

  User user1, user2, user3;
  Admin admin;
  Gma gma;
  Parent parent;

  UserDB userDB;

  private final Gson gson = GsonFactory.getGson();

  @Before
  public void loadEvent() throws Exception {
    getUsersSuccess =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_GET_users_success.json");
    getGmasSuccess = testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_GET_gmas_success.json");
    getUsers1Success =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_GET_users_1_success.json");

    postUserSuccess =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_POST_users_success.json");
    putUserSuccess =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_PUT_users_1_success.json");
    deleteUserSuccess =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_DELETE_users_1_success.json");
    error404 = testUtils.loadJsonFile("test_LambdaProxyEvent_uesrsapi_404.json");

    // setup users
    user1 = testUtils.generateUser();
    user1.setId(1);
    user2 = testUtils.generateUser();
    user2.setId(2);
    user3 = testUtils.generateUser();
    user3.setId(3);

    admin = testUtils.generateAdmin();
    admin.setId(4);

    gma = testUtils.generateGma();
    gma.setId(5);

    parent = testUtils.generateParent();
    parent.setId(6);

    // setup userDB
    userDB = mock(UserDB.class);
  }

  @Test
  public void testGetAllUsers() throws Exception {

    final List<User> users = Lists.newArrayList(user1, user2, user3);
    when(userDB.getAllUsers()).thenReturn(users);

    final UsersApi api = new UsersApi(userDB);
    String json = api.handleHttpGet(getUsersSuccess, null);
    final String expectedJson = gson.toJson(users);
    Assert.assertEquals(expectedJson, json);

    // test through api
    json = api.handleApiEvent(getUsersSuccess, null);
    Assert.assertEquals(expectedJson, json);
  }

  @Test
  public void testGetAllUsersWithAuthorizerNotAuthToken() throws Exception {
    final List<User> users = Lists.newArrayList(user1, user2, user3);
    when(userDB.getAllUsers()).thenReturn(users);

    final UsersApi api = new UsersApi(userDB, new ApiAuthorizer());
    try {
      api.handleApiEvent(getUsersSuccess, null);
      Assert.fail("Should throw UnauthorizedExeception");
    } catch (final UnauthorizedExeception e) {
    }

  }

  @Test
  public void testAdminAccessToAllUsers() throws Exception {
    final List<User> users = Lists.newArrayList(user1, user2, user3);
    when(userDB.getAllUsers()).thenReturn(users);

    UsersApi api = new UsersApi(userDB, new ApiAuthorizer());

    // add auth header and mock lookup to database
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    when(ak.me("ACCESS_TOKEN")).thenReturn(akUser);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(admin);

    api = new UsersApi(userDB, new ApiAuthorizer(ak, userDB));
    getUsersSuccess.getHeaders().put("Authorization", "Bearer ACCESS_TOKEN");

    final String json = api.handleApiEvent(getUsersSuccess, null);
    final String expectedJson = gson.toJson(users);
    Assert.assertEquals(expectedJson, json);

  }

  @Test
  public void testParentAccessToAllUsers() throws Exception {
    final List<User> users = Lists.newArrayList(user1, user2, user3);
    when(userDB.getAllUsers()).thenReturn(users);

    UsersApi api = new UsersApi(userDB, new ApiAuthorizer());

    // add auth header and mock lookup to database
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    when(ak.me("ACCESS_TOKEN")).thenReturn(akUser);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(parent);

    api = new UsersApi(userDB, new ApiAuthorizer(ak, userDB));
    getUsersSuccess.getHeaders().put("Authorization", "Bearer ACCESS_TOKEN");

    try {
      api.handleApiEvent(getUsersSuccess, null);
      Assert.fail("Should throw UnauthorizedExeception");
    } catch (final UnauthorizedExeception e) {
    }

  }

  @Test
  public void testParentAccessToGetSelf() throws Exception {
    final List<User> users = Lists.newArrayList(user1, user2, user3);
    when(userDB.getAllUsers()).thenReturn(users);
    when(userDB.getParent(parent.getId(), false)).thenReturn(parent);

    UsersApi api = new UsersApi(userDB, new ApiAuthorizer());

    // change path id to 4 to test parent
    getUsers1Success.setPath("dev/api/parents/" + parent.getId());
    final Map<String, String> proxyPath = Maps.newHashMap();
    proxyPath.put("proxy", "parents/" + parent.getId());
    getUsers1Success.setPathParameters(proxyPath);

    // add auth header and mock lookup to database
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    when(ak.me("ACCESS_TOKEN")).thenReturn(akUser);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(parent);

    api = new UsersApi(userDB, new ApiAuthorizer(ak, userDB));
    getUsers1Success.getHeaders().put("Authorization", "Bearer ACCESS_TOKEN");

    final String json = api.handleApiEvent(getUsers1Success, null);
    final String expectedJson = gson.toJson(parent);
    Assert.assertEquals(expectedJson, json);
    verify(userDB).getParent(parent.getId(), false);
  }

  @Test
  public void testParentAccessToUpdateSelf() throws Exception {
    when(userDB.updateParent(parent)).thenReturn(parent);


    UsersApi api = new UsersApi(userDB, new ApiAuthorizer());

    // change path id to 4 to test parent
    putUserSuccess.setPath("dev/api/parents/" + parent.getId());
    final Map<String, String> proxyPath = Maps.newHashMap();
    proxyPath.put("proxy", "parents/" + parent.getId());
    putUserSuccess.setPathParameters(proxyPath);
    putUserSuccess.setBody(gson.toJson(parent));

    // add auth header and mock lookup to database
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    when(ak.me("ACCESS_TOKEN")).thenReturn(akUser);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(parent);

    api = new UsersApi(userDB, new ApiAuthorizer(ak, userDB));
    putUserSuccess.getHeaders().put("Authorization", "Bearer ACCESS_TOKEN");

    final String json = api.handleApiEvent(putUserSuccess, null);
    final String expectedJson = gson.toJson(parent);
    Assert.assertEquals(expectedJson, json);
    verify(userDB).updateParent(parent);
  }

  @Test
  public void testGmaAccessToGetSelf() throws Exception {
    final List<User> users = Lists.newArrayList(user1, user2, user3);
    when(userDB.getAllUsers()).thenReturn(users);
    when(userDB.getGma(gma.getId(), false)).thenReturn(gma);

    UsersApi api = new UsersApi(userDB, new ApiAuthorizer());

    // change path id to 4 to test parent
    getUsers1Success.setPath("dev/api/gmas/" + gma.getId());
    final Map<String, String> proxyPath = Maps.newHashMap();
    proxyPath.put("proxy", "gmas/" + gma.getId());
    getUsers1Success.setPathParameters(proxyPath);

    // add auth header and mock lookup to database
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    when(ak.me("ACCESS_TOKEN")).thenReturn(akUser);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(gma);

    api = new UsersApi(userDB, new ApiAuthorizer(ak, userDB));
    getUsers1Success.getHeaders().put("Authorization", "Bearer ACCESS_TOKEN");

    final String json = api.handleApiEvent(getUsers1Success, null);
    final String expectedJson = gson.toJson(gma);
    Assert.assertEquals(expectedJson, json);
    verify(userDB).getGma(gma.getId(), false);
  }

  @Test
  public void testGmaAccessToUpdateSelf() throws Exception {
    when(userDB.updateGma(gma)).thenReturn(gma);


    UsersApi api = new UsersApi(userDB, new ApiAuthorizer());

    // change path id to 4 to test parent
    putUserSuccess.setPath("dev/api/gmas/" + gma.getId());
    final Map<String, String> proxyPath = Maps.newHashMap();
    proxyPath.put("proxy", "gmas/" + gma.getId());
    putUserSuccess.setPathParameters(proxyPath);
    putUserSuccess.setBody(gson.toJson(gma));

    // add auth header and mock lookup to database
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    when(ak.me("ACCESS_TOKEN")).thenReturn(akUser);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(gma);

    api = new UsersApi(userDB, new ApiAuthorizer(ak, userDB));
    putUserSuccess.getHeaders().put("Authorization", "Bearer ACCESS_TOKEN");

    final String json = api.handleApiEvent(putUserSuccess, null);
    final String expectedJson = gson.toJson(gma);
    Assert.assertEquals(expectedJson, json);
    verify(userDB).updateGma(gma);
  }

  @Test
  public void testGetAllGmas() throws Exception {

    final List<Gma> gmas = Lists.newArrayList(gma);
    when(userDB.getAllGmas()).thenReturn(gmas);

    UsersApi api = new UsersApi(userDB);
    String json = api.handleHttpGet(getGmasSuccess, null);
    final String expectedJson = gson.toJson(gmas);
    Assert.assertEquals(expectedJson, json);

    // test through api
    json = api.handleApiEvent(getGmasSuccess, null);
    Assert.assertEquals(expectedJson, json);

    // send through ApiLambdaHandler
    LambdaProxyOutput out = new ApiLambdaHandler().handleRequest(getGmasSuccess, null);
    // expect unauthenticated error
    Assert.assertEquals(401, out.getStatusCode());

    // mock authenticate
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    when(ak.me("ACCESS_TOKEN")).thenReturn(akUser);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(parent);

    api = new UsersApi(userDB, new ApiAuthorizer(ak, userDB));
    getGmasSuccess.getHeaders().put("Authorization", "Bearer ACCESS_TOKEN");

    out = new ApiLambdaHandler(api).handleRequest(getGmasSuccess, null);

    // expect unauthenticated error
    Assert.assertEquals(200, out.getStatusCode());
  }

  @Test
  public void testParentCanListGmas() throws Exception {
    final List<Gma> gmas = Lists.newArrayList(gma);
    when(userDB.getAllGmas()).thenReturn(gmas);

    UsersApi api = new UsersApi(userDB, new ApiAuthorizer());

    // change path id to 4 to test parent
    getUsersSuccess.setPath("dev/api/gmas");
    final Map<String, String> proxyPath = Maps.newHashMap();
    proxyPath.put("proxy", "gmas");
    getUsersSuccess.setPathParameters(proxyPath);

    // add auth header and mock lookup to database
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    when(ak.me("ACCESS_TOKEN")).thenReturn(akUser);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(parent);

    api = new UsersApi(userDB, new ApiAuthorizer(ak, userDB));
    getUsersSuccess.getHeaders().put("Authorization", "Bearer ACCESS_TOKEN");

    final String json = api.handleApiEvent(getUsersSuccess, null);
    final String expectedJson = gson.toJson(gmas);
    Assert.assertEquals(expectedJson, json);
    verify(userDB).getAllGmas();
  }


  @Test
  public void testGetUser1() throws Exception {
    // setup userDB
    final User user1 = testUtils.generateUser();
    user1.setId(1);
    when(userDB.getUser(1, false)).thenReturn(user1);

    final UsersApi api = new UsersApi(userDB);
    String json = api.handleHttpGet(getUsers1Success, null);
    final String expectedJson = gson.toJson(user1);
    Assert.assertEquals(expectedJson, json);

    // test through api
    json = api.handleApiEvent(getUsers1Success, null);
    Assert.assertEquals(expectedJson, json);
  }

  @Test
  public void testPostUser1() throws Exception {
    // setup userDB
    final User user1 = testUtils.generateUser();
    when(userDB.createUser(Mockito.any(User.class))).thenReturn(user1);

    final UsersApi api = new UsersApi(userDB);
    postUserSuccess.setBody(gson.toJson(user1));
    String json = api.handleHttpPost(postUserSuccess, null);
    final String expectedJson = gson.toJson(user1);
    Assert.assertEquals(expectedJson, json);

    json = api.handleApiEvent(postUserSuccess, null);
    Assert.assertEquals(expectedJson, json);
  }

  @Test
  public void testPutUser1() throws Exception {
    // setup userDB
    final User user1 = testUtils.generateUser();
    user1.setId(1);
    when(userDB.updateUser(Mockito.any(User.class))).thenReturn(user1);

    final UsersApi api = new UsersApi(userDB);
    putUserSuccess.setBody(gson.toJson(user1));
    String json = api.handleHttpPut(putUserSuccess, null);
    final String expectedJson = gson.toJson(user1);
    Assert.assertEquals(expectedJson, json);

    json = api.handleApiEvent(putUserSuccess, null);
    Assert.assertEquals(expectedJson, json);
  }

  @Test
  public void testDeleteUser1() throws Exception {
    // setup userDB
    when(userDB.deleteUser(Mockito.anyInt())).thenReturn(true);

    final UsersApi api = new UsersApi(userDB);
    String json = api.handleHttpDelete(deleteUserSuccess, null);
    final JsonObject expectedJson = new JsonObject();
    expectedJson.addProperty("success", true);
    Assert.assertEquals(gson.toJson(expectedJson), json);

    json = api.handleApiEvent(deleteUserSuccess, null);
    Assert.assertEquals(gson.toJson(expectedJson), json);
  }

}
