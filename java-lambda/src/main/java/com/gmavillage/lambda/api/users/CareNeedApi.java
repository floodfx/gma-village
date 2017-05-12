package com.gmavillage.lambda.api.users;

import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.api.DefaultApi;
import com.gmavillage.lambda.api.SQSHelper;
import com.gmavillage.lambda.api.UnauthorizedExeception;
import com.gmavillage.lambda.api.authorizer.ApiAuthorizer;
import com.gmavillage.lambda.api.authorizer.Authorizer;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.model.CareNeed;
import com.gmavillage.model.Gma;
import com.gmavillage.model.json.GsonFactory;
import com.google.common.base.Preconditions;
import com.google.gson.Gson;

public class CareNeedApi extends DefaultApi {

  private final UserDB userDB;
  private final Authorizer authorizer;
  private final SQSHelper sqsHelper;

  private final Gson gson = GsonFactory.getGson();

  public CareNeedApi() {
    this(new UserDB(), new ApiAuthorizer(), new SQSHelper());
  }

  public CareNeedApi(final UserDB userDB) {
    this(userDB, new ApiAuthorizer());
  }

  public CareNeedApi(final UserDB userDB, final Authorizer authorizer) {
    this(userDB, authorizer, new SQSHelper());
  }

  public CareNeedApi(final UserDB userDB, final Authorizer authorizer, final SQSHelper sqsHelper) {
    this.userDB = userDB;
    this.authorizer = authorizer;
    this.sqsHelper = sqsHelper;
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
    final ProxyPathParts parts = safeProxyPath(getEvent);
    try {
      if (parts.id() == null) {
        return gson.toJson(userDB.getAllCareNeeds());
      } else {
        // get single care need
        final Integer id = parts.id();
        if (id != null) {
          return gson.toJson(userDB.getCareNeed(id));
        } else {
          throw new RuntimeException("Unknown User");
        }
      }
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected String handleHttpPost(final LambdaProxyEvent postEvent, final Context context) {
    final ProxyPathParts parts = safeProxyPath(postEvent);
    final String body = postEvent.getBody();
    Preconditions.checkArgument(body != null, "POST body must not be empty");
    try {
      if (parts.id() == null) {
        // create new careneed
        final CareNeed cn = gson.fromJson(body, CareNeed.class);
        final CareNeed created = userDB.createCareNeed(cn);
        // push messages to sqs
        final String messageText = gson.toJson(cn);
        for (final Gma g : cn.getMatchingGmas()) {
          sqsHelper.sendSqsMessage(g.getPhone(), messageText);
        }
        return gson.toJson(created);
      } else {
        throw new RuntimeException("Invalid Path");
      }
    } catch (final Exception e) {
      throw new RuntimeException(e);
    }
  }



  public static ProxyPathParts safeProxyPath(final LambdaProxyEvent event) {
    final Map<String, String> pathParams = event.getPathParameters();
    try {
      final String proxyPath = pathParams.get("proxy");
      if (proxyPath != null) {
        final String[] parts = proxyPath.split("/");
        if (parts.length == 1) {
          return ProxyPathParts.create(parts[0], null);
        } else {
          return ProxyPathParts.create(parts[0], Integer.parseInt(parts[1]));
        }
      } else {
        return ProxyPathParts.create(null, null);
      }
    } catch (final Exception e) {
      e.printStackTrace();
    }
    return ProxyPathParts.create(null, null);
  }

}
