package com.gmavillage.lambda.api;

import static com.gmavillage.lambda.LambdaProxyOutputHelper.success;
import static com.google.common.base.MoreObjects.firstNonNull;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.gmavillage.lambda.AbstractLambdaProxyHandler;
import com.gmavillage.lambda.LambdaProxyOutputHelper;
import com.gmavillage.lambda.api.users.UsersApi;

public class ApiLambdaHandler extends AbstractLambdaProxyHandler {

  private static final Pattern PROXY_PATH_MATCHER = Pattern.compile(
      "(users)(\\/\\d+){0,1}|(gmas)(\\/\\d+){0,1}|(parents)(\\/\\d+){0,1}|(admins)(\\/\\d+){0,1}");

  private final UsersApi usersApi;

  public ApiLambdaHandler() {
    this.usersApi = new UsersApi();
  }

  public ApiLambdaHandler(final UsersApi usersApi) {
    this.usersApi = usersApi;
  }

  @Override
  protected LambdaProxyOutput processEvent(final LambdaProxyEvent event, final Context context)
      throws Exception {

    // just return success for OPTIONS requests (likely CORS preflight)
    if ("OPTIONS".equals(event.getHttpMethod())) {
      return success("", requestOrigin(event));
    }
    // otherwise see which API request is for
    final String proxyPath = firstNonNull(event.getPathParameters().get("proxy"), "");
    logInfo("proxyPath:" + proxyPath);
    if (proxyPathSupported(proxyPath)) {
      try {
        logInfo("Processing User Request");
        return success(usersApi.handleApiEvent(event, context), requestOrigin(event));
      } catch (final UnauthorizedExeception e) {
        e.printStackTrace();
        return LambdaProxyOutputHelper.error(e.getStatus(), null, requestOrigin(event));
      }
    } else {
      return LambdaProxyOutputHelper.error404();
    }

  }

  public boolean proxyPathSupported(final String proxyPath) {
    final Matcher matcher = PROXY_PATH_MATCHER.matcher(proxyPath);
    return matcher.matches();
  }


}
