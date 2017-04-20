package com.gmavillage.lambda.accountkit;

import static com.google.common.base.MoreObjects.firstNonNull;
import static java.lang.System.getenv;

import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.gmavillage.lambda.util.CORS;
import com.gmavillage.lambda.util.DebugHelper;
import com.google.common.base.Optional;
import com.google.common.collect.Maps;
import com.google.gson.Gson;

public class LambdaHandler implements RequestHandler<LambdaProxyEvent, LambdaProxyOutput>, CORS {

  private static final String APP_ID = firstNonNull(getenv("AK_APP_ID"), "AK_APP_ID");
  private static final String CSRF = firstNonNull(getenv("CSRF"), "CSRF");
  private static final String VERSION = firstNonNull(getenv("AK_APP_VERSION"), "AK_APP_VERSION");

  private void log(final LambdaLogger logger, final String text) {
    if (logger != null) {
      logger.log(text);
    }
  }

  @Override
  public LambdaProxyOutput handleRequest(final LambdaProxyEvent event, final Context context) {
    LambdaLogger logger = null;
    if (context != null) {
      logger = context.getLogger();
    }
    log(logger, "Received event:" + DebugHelper.toStringLambdaProxyEvent(event));
    final String proxyPath = firstNonNull(event.getPathParameters().get("proxy"), "");
    switch (proxyPath) {
      case "init":
        return success(initAccountKit(event, context));
      case "authorize":
        return success(authorize(event, context));
      default:
        return error404();
    }
  }

  private String authorize(final LambdaProxyEvent event, final Context context) {
    if (Optional.of(event.getQueryStringParameters()).isPresent()) {
      final String csrfNonce = event.getQueryStringParameters().get("csrfNonce");
      final String authCode = event.getQueryStringParameters().get("authCode");

      if (CSRF.equals(csrfNonce)) {

      } else {

      }
    }
    return new Gson().toJson("");
  }

  private String initAccountKit(final LambdaProxyEvent event, final Context context) {
    final Map<String, String> akparams = Maps.newHashMap();
    akparams.put("appId", APP_ID);
    akparams.put("csrf", CSRF);
    akparams.put("version", VERSION);
    return new Gson().toJson(akparams);
  }

  private LambdaProxyOutput success(final String body) {
    return new LambdaProxyOutput(200, CORS.HEADERS, body);
  }

  private LambdaProxyOutput error404() {
    return new LambdaProxyOutput(404);
  }


}
