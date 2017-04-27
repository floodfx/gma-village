package com.gmavillage.lambda.api.users;

import static com.google.gson.FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.api.DefaultApi;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.model.User;
import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

public class UsersApi extends DefaultApi {

  private static final String USERS = "users";

  private final UserDB userDB;
  final Gson gson = new GsonBuilder().setFieldNamingPolicy(LOWER_CASE_WITH_UNDERSCORES).create();

  public UsersApi(final UserDB userDB) {
    this.userDB = userDB;
  }

  @Override
  protected String handleHttpGet(final LambdaProxyEvent getEvent, final Context context) {
    final String path = getEvent.getPath();
    try {
      if (isLastPathPartEquals(path, USERS)) {
        // get all users
        return gson.toJson(userDB.getAllUsers());
      } else {
        // get single user by id
        final Integer id = getLastPathPartInteger(path);
        if (id != null) {
          return gson.toJson(userDB.getUser(id, false));
        }
        throw new RuntimeException("Unknown User");
      }
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected String handleHttpPost(final LambdaProxyEvent postEvent, final Context context) {
    final String path = postEvent.getPath();
    final String body = postEvent.getBody();
    Preconditions.checkArgument(body != null, "POST body must not be empty");
    try {
      if (isLastPathPartEquals(path, USERS)) {
        // create new user
        final User u = gson.fromJson(body, User.class);
        return gson.toJson(userDB.createUser(u));
      } else {
        throw new RuntimeException("Invalid Path");
      }
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected String handleHttpPut(final LambdaProxyEvent putEvent, final Context context) {
    final String path = putEvent.getPath();
    final String body = putEvent.getBody();
    try {
      if (isLastPathPartEquals(path, USERS)) {
        throw new RuntimeException("Unknown User");
      } else {
        // get user id from path
        final Integer id = getLastPathPartInteger(path);
        if (id != null) {
          final User u = gson.fromJson(body, User.class);
          // only allow update if id from path matches id from user
          if (new Integer(id).equals(u.getId())) {
            return gson.toJson(userDB.updateUser(u));
          }
        }
        throw new RuntimeException("Unknown User");
      }
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected String handleHttpDelete(final LambdaProxyEvent deleteEvent, final Context context) {
    final String path = deleteEvent.getPath();
    try {
      if (isLastPathPartEquals(path, USERS)) {
        throw new RuntimeException("Unknown User");
      } else {
        // get user id from path
        final Integer id = getLastPathPartInteger(path);
        if (id != null) {
          final boolean success = userDB.deleteUser(id.intValue());
          final JsonObject successJson = new JsonObject();
          successJson.addProperty("success", success);
          return new Gson().toJson(successJson);
        }
        throw new RuntimeException("Unknown User");
      }
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  private boolean isLastPathPartEquals(final String path, final String test) {
    return test.equals(getLastPathPart(path));
  }

}
