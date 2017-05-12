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
import com.gmavillage.lambda.api.users.CareNeedApi;
import com.gmavillage.lambda.api.users.UsersApi;

public class ApiLambdaHandler extends AbstractLambdaProxyHandler {

  public static final Pattern USERS_MATCHER = Pattern.compile(
      "(users)(\\/\\d+){0,1}|(gmas)(\\/\\d+){0,1}|(parents)(\\/\\d+){0,1}|(admins)(\\/\\d+){0,1}");

  private static final String SIGN_URL = "signurl";
  public static final Pattern CARE_NEEDS_MATCHER = Pattern.compile("(careneeds)(\\/\\d+){0,1}");

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
    if (regexMatched(proxyPath, USERS_MATCHER)) {
      try {
        logInfo("Processing User Request");
        return success(usersApi.handleApiEvent(event, context), requestOrigin(event));
      } catch (final UnauthorizedExeception e) {
        e.printStackTrace();
        return LambdaProxyOutputHelper.error(e.getStatus(), null, requestOrigin(event));
      }
    } else if (SIGN_URL.equals(proxyPath)) {
      try {
        return success(new S3Signer().signUrl(event, context), requestOrigin(event));
      } catch (final Exception e) {
        e.printStackTrace();
        return LambdaProxyOutputHelper.error(500, null, requestOrigin(event));
      }
    } else if (regexMatched(proxyPath, CARE_NEEDS_MATCHER)) {
      try {
        return success(new CareNeedApi().handleApiEvent(event, context), requestOrigin(event));
      } catch (final Exception e) {
        e.printStackTrace();
        return LambdaProxyOutputHelper.error(500, null, requestOrigin(event));
      }
    } else {
      return LambdaProxyOutputHelper.error404();
    }

  }

  public boolean regexMatched(final String proxyPath, final Pattern regex) {
    final Matcher match = regex.matcher(proxyPath);
    return match.matches();
  }


}
