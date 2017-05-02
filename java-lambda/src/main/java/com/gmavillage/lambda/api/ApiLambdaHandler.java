package com.gmavillage.lambda.api;

import static com.google.common.base.MoreObjects.firstNonNull;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.gmavillage.lambda.AbstractLambdaProxyHandler;
import com.gmavillage.lambda.api.users.UsersApi;
import com.gmavillage.lambda.db.UserDB;

public class ApiLambdaHandler extends AbstractLambdaProxyHandler {

  private UserDB userDB;

  public void setUserDB(final UserDB userDB) {
    this.userDB = userDB;
  }

  @Override
  protected LambdaProxyOutput processEvent(final LambdaProxyEvent event, final Context context)
      throws Exception {

    // just return success for OPTIONS requests (likely CORS preflight)
    if ("OPTIONS".equals(event.getHttpMethod())) {
      return success("", event);
    }
    // otherwise see which API request is for
    final String proxyPath = firstNonNull(event.getPathParameters().get("proxy"), "");
    logInfo("proxyPath:" + proxyPath);
    if (proxyPath.startsWith("users")) {
      return success(new UsersApi(this.userDB).handleApiEvent(event, context), event);
    } else {
      return error404();
    }

  }
}