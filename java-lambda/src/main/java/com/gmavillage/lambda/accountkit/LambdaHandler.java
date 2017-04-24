package com.gmavillage.lambda.accountkit;

import static com.google.common.base.MoreObjects.firstNonNull;
import static java.lang.System.getenv;

import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.gmavillage.lambda.AbstractLambdaProxyHandler;
import com.google.common.base.Optional;
import com.google.common.collect.Maps;
import com.google.gson.Gson;

public class LambdaHandler extends AbstractLambdaProxyHandler {

  private static final String APP_ID = firstNonNull(getenv("AK_APP_ID"), "AK_APP_ID");
  private static final String CSRF = firstNonNull(getenv("CSRF"), "CSRF");
  private static final String VERSION = firstNonNull(getenv("AK_APP_VERSION"), "AK_APP_VERSION");
  private static final String APP_SECRET = firstNonNull(getenv("AK_APP_SECRET"), "AK_APP_SECRET");
  private final AccountKitClient accountKit;

  public LambdaHandler() {
    this(new AccountKitClient(APP_ID, APP_SECRET, VERSION));
  }

  public LambdaHandler(final AccountKitClient accountKit) {
    this.accountKit = accountKit;
  }

  @Override
  protected LambdaProxyOutput processEvent(final LambdaProxyEvent event, final Context context)
      throws Exception {
    final String proxyPath = firstNonNull(event.getPathParameters().get("proxy"), "");
    logInfo("proxyPath:" + proxyPath);
    switch (proxyPath) {
      case "init":
        return initAccountKit(event, context);
      case "authorize":
        return authorize(event, context);
      default:
        return error404();
    }
  }

  private LambdaProxyOutput authorize(final LambdaProxyEvent event, final Context context)
      throws Exception {
    if (Optional.of(event.getQueryStringParameters()).isPresent()) {
      final String csrfNonce = event.getQueryStringParameters().get("csrfNonce");
      final String authCode = event.getQueryStringParameters().get("authCode");
      if (CSRF.equals(csrfNonce)) {
        try {
          return success(accountKit.accessTokenAsString(authCode), event);
        } catch (final Exception e) {
          System.err.println("Error:" + e);
          return error("{\"error\": \"Error Authorizing\"}");
        }
      } else {
        // CSRF mismatch
        return error("{\"error\": \"CSRF Mismatch\"}");
      }
    }
    // empty params
    return error("{\"error\": \"Missing parameters\"}");
  }

  private LambdaProxyOutput initAccountKit(final LambdaProxyEvent event, final Context context) {
    final Map<String, String> initValues = Maps.newHashMap();
    initValues.put("appId", APP_ID);
    initValues.put("csrf", CSRF);
    initValues.put("version", VERSION);
    return success(new Gson().toJson(initValues), event);
  }


}
