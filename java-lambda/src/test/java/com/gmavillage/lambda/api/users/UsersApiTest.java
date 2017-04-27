package com.gmavillage.lambda.api.users;

import static com.google.gson.FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.model.User;
import com.gmavillage.test.TestUtils;
import com.google.common.collect.Lists;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

public class UsersApiTest {

  TestUtils testUtils = new TestUtils();

  LambdaProxyEvent getUsersSuccess;
  LambdaProxyEvent getUsers1Success;
  LambdaProxyEvent postUserSuccess;
  LambdaProxyEvent putUserSuccess;
  LambdaProxyEvent deleteUserSuccess;
  LambdaProxyEvent error404;

  UserDB userDB;

  final Gson gson = new GsonBuilder().setFieldNamingPolicy(LOWER_CASE_WITH_UNDERSCORES).create();

  @Before
  public void loadEvent() throws Exception {
    getUsersSuccess =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_GET_users_success.json");
    getUsers1Success =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_GET_users_1_success.json");

    postUserSuccess =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_POST_users_success.json");
    putUserSuccess =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_PUT_users_1_success.json");
    deleteUserSuccess =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_DELETE_users_1_success.json");
    error404 = testUtils.loadJsonFile("test_LambdaProxyEvent_uesrsapi_404.json");

    // setup userDB
    userDB = mock(UserDB.class);
  }

  @Test
  public void testGetAllUsers() throws Exception {
    // setup userDB
    final User user1 = testUtils.generateUser();
    user1.setId(1);
    final User user2 = testUtils.generateUser();
    user1.setId(2);
    final User user3 = testUtils.generateUser();
    user1.setId(3);
    final List<User> users = Lists.newArrayList(user1, user2, user3);
    when(userDB.getAllUsers()).thenReturn(users);

    final UsersApi api = new UsersApi(userDB);
    final String json = api.handleHttpGet(getUsersSuccess, null);
    final String expectedJson = gson.toJson(users);
    Assert.assertEquals(expectedJson, json);
  }

  @Test
  public void testGetUser1() throws Exception {
    // setup userDB
    final User user1 = testUtils.generateUser();
    user1.setId(1);
    when(userDB.getUser(1, false)).thenReturn(user1);

    final UsersApi api = new UsersApi(userDB);
    final String json = api.handleHttpGet(getUsers1Success, null);
    final String expectedJson = gson.toJson(user1);
    Assert.assertEquals(expectedJson, json);
  }

  @Test
  public void testPostUser1() throws Exception {
    // setup userDB
    final User user1 = testUtils.generateUser();
    when(userDB.createUser(Mockito.any(User.class))).thenReturn(user1);

    final UsersApi api = new UsersApi(userDB);
    final String json = api.handleHttpPost(postUserSuccess, null);
    final String expectedJson = gson.toJson(user1);
    Assert.assertEquals(expectedJson, json);
  }

  @Test
  public void testPutUser1() throws Exception {
    // setup userDB
    final User user1 = testUtils.generateUser();
    when(userDB.updateUser(Mockito.any(User.class))).thenReturn(user1);

    final UsersApi api = new UsersApi(userDB);
    final String json = api.handleHttpPut(putUserSuccess, null);
    final String expectedJson = gson.toJson(user1);
    Assert.assertEquals(expectedJson, json);
  }

  @Test
  public void testDeleteUser1() throws Exception {
    // setup userDB
    when(userDB.deleteUser(Mockito.anyInt())).thenReturn(true);

    final UsersApi api = new UsersApi(userDB);
    final String json = api.handleHttpDelete(deleteUserSuccess, null);
    final JsonObject expectedJson = new JsonObject();
    expectedJson.addProperty("success", true);
    Assert.assertEquals(gson.toJson(expectedJson), json);
  }

}
