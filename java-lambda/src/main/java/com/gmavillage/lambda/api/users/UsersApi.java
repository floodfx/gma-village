package com.gmavillage.lambda.api.users;

import static com.google.gson.FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES;

import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.api.DefaultApi;
import com.gmavillage.lambda.api.UnauthorizedExeception;
import com.gmavillage.lambda.api.authorizer.ApiAuthorizer;
import com.gmavillage.lambda.api.authorizer.Authorizer;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.model.Admin;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Parent;
import com.gmavillage.model.User;
import com.gmavillage.model.UserType;
import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

public class UsersApi extends DefaultApi {

  private static final String USERS = "users";

  private final UserDB userDB;
  private final Authorizer authorizer;

  final Gson gson = new GsonBuilder().setFieldNamingPolicy(LOWER_CASE_WITH_UNDERSCORES).create();

  public UsersApi() {
    this(new UserDB(), new ApiAuthorizer());
  }

  public UsersApi(final UserDB userDB) {
    this(userDB, null);
  }

  public UsersApi(final UserDB userDB, final Authorizer authorizer) {
    this.userDB = userDB;
    this.authorizer = authorizer;
  }

  @Override
  public int authorizeRequest(final LambdaProxyEvent event, final Context context)
      throws UnauthorizedExeception {
    if (authorizer != null) {
      return authorizer.authorizeRequest(event, context);
    }
    return 200;
  }

  @Override
  protected String handleHttpGet(final LambdaProxyEvent getEvent, final Context context) {
    final UsersApiProxyPathParts parts = safeProxyPath(getEvent);
    try {
      final UserType type = userTypeFromPathParts(parts);
      if (parts.userId() == null) {
        // determine user types to fetch
        switch (type) {
          case USER:
            return gson.toJson(userDB.getAllUsers());
          case ADMIN:
            return gson.toJson(userDB.getAllAdmins());
          case GMA:
            return gson.toJson(userDB.getAllGmas());
          case PARENT:
            return gson.toJson(userDB.getAllParents());
        }
        throw new RuntimeException("Invalid Path");
      } else {
        // get single user by id
        final Integer id = parts.userId();
        if (id != null) {
          switch (type) {
            case USER:
              return gson.toJson(userDB.getUser(id, false));
            case ADMIN:
              return gson.toJson(userDB.getAdmin(id, false));
            case GMA:
              return gson.toJson(userDB.getGma(id, false));
            case PARENT:
              return gson.toJson(userDB.getParent(id, false));
          }
        }
        throw new RuntimeException("Unknown User");
      }
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected String handleHttpPost(final LambdaProxyEvent postEvent, final Context context) {
    final UsersApiProxyPathParts parts = safeProxyPath(postEvent);
    final String body = postEvent.getBody();
    final UserType type = userTypeFromPathParts(parts);
    Preconditions.checkArgument(body != null, "POST body must not be empty");
    try {
      if (parts.userId() == null) {
        // create new user
        switch (type) {
          case USER:
            final User u = gson.fromJson(body, User.class);
            return gson.toJson(userDB.createUser(u));
          case ADMIN:
            final Admin a = gson.fromJson(body, Admin.class);
            return gson.toJson(userDB.createAdmin(a));
          case GMA:
            final Gma g = gson.fromJson(body, Gma.class);
            return gson.toJson(userDB.createGma(g));
          case PARENT:
            final Parent p = gson.fromJson(body, Parent.class);
            return gson.toJson(userDB.createParent(p));
        }
        throw new RuntimeException("Invalid Path");
      } else {
        throw new RuntimeException("Invalid Path");
      }
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected String handleHttpPut(final LambdaProxyEvent putEvent, final Context context) {
    final UsersApiProxyPathParts parts = safeProxyPath(putEvent);
    final String body = putEvent.getBody();
    final UserType type = userTypeFromPathParts(parts);
    try {
      if (parts.userId() == null) {
        throw new RuntimeException("Unknown User");
      } else {
        // update user
        switch (type) {
          case USER:
            final User u = gson.fromJson(body, User.class);
            // only allow update if id from path matches id from user
            if (parts.userId().equals(u.getId())) {
              return gson.toJson(userDB.updateUser(u));
            }
            break;
          case ADMIN:
            final Admin a = gson.fromJson(body, Admin.class);
            // only allow update if id from path matches id from user
            if (parts.userId().equals(a.getId())) {
              return gson.toJson(userDB.updateAdmin(a));
            }
            break;
          case GMA:
            final Gma g = gson.fromJson(body, Gma.class);
            // only allow update if id from path matches id from user
            if (parts.userId().equals(g.getId())) {
              return gson.toJson(userDB.updateGma(g));
            }
            break;
          case PARENT:
            final Parent p = gson.fromJson(body, Parent.class);
            // only allow update if id from path matches id from user
            if (parts.userId().equals(p.getId())) {
              return gson.toJson(userDB.updateParent(p));
            }
            break;
        }
        throw new RuntimeException("Unknown User");
      }
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected String handleHttpDelete(final LambdaProxyEvent deleteEvent, final Context context) {
    final UsersApiProxyPathParts parts = safeProxyPath(deleteEvent);
    try {
      if (parts.userId() == null || parts.userType() == null) {
        throw new RuntimeException("Unknown User");
      } else {
        // get user id from path
        final boolean deleted = userDB.deleteUser(parts.userId());
        final JsonObject successJson = new JsonObject();
        successJson.addProperty("success", deleted);
        return new Gson().toJson(successJson);
      }
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  public static UsersApiProxyPathParts safeProxyPath(final LambdaProxyEvent event) {
    final Map<String, String> pathParams = event.getPathParameters();
    try {
      final String proxyPath = pathParams.get("proxy");
      if (proxyPath != null) {
        final String[] parts = proxyPath.split("/");
        if (parts.length == 1) {
          return UsersApiProxyPathParts.create(parts[0], null);
        } else {
          return UsersApiProxyPathParts.create(parts[0], Integer.parseInt(parts[1]));
        }
      } else {
        return UsersApiProxyPathParts.create(null, null);
      }
    } catch (final Exception e) {
      e.printStackTrace();
    }
    return UsersApiProxyPathParts.create(null, null);
  }

  public static UserType userTypeFromPathParts(final UsersApiProxyPathParts parts) {
    if (parts.userType() != null) {
      switch (parts.userType()) {
        case "users":
          return UserType.USER;
        case "admins":
          return UserType.ADMIN;
        case "parents":
          return UserType.PARENT;
        case "gmas":
          return UserType.GMA;
      }
    }
    return null;
  }

}
