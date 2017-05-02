package com.gmavillage.lambda.accountkit;

import static com.google.common.base.MoreObjects.firstNonNull;
import static com.google.gson.FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES;
import static java.lang.System.getenv;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.gmavillage.lambda.AbstractLambdaProxyHandler;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.lambda.model.accountkit.AccountKitUser;
import com.gmavillage.lambda.model.accountkit.AccountKitUserAccessToken;
import com.gmavillage.model.User;
import com.google.common.base.Optional;
import com.google.common.collect.Maps;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class LambdaHandler extends AbstractLambdaProxyHandler {

  private static final String APP_ID = firstNonNull(getenv("AK_APP_ID"), "AK_APP_ID");
  private static final String CSRF = firstNonNull(getenv("CSRF"), "CSRF");
  private static final String VERSION = firstNonNull(getenv("AK_APP_VERSION"), "AK_APP_VERSION");
  private static final String APP_SECRET = firstNonNull(getenv("AK_APP_SECRET"), "AK_APP_SECRET");
  final Gson gson = new GsonBuilder().setFieldNamingPolicy(LOWER_CASE_WITH_UNDERSCORES).create();
  private final AccountKitClient accountKit;
  private final UserDB userDB;

  public LambdaHandler() {
    this(new AccountKitClient(APP_ID, APP_SECRET, VERSION), new UserDB());
  }

  public LambdaHandler(final AccountKitClient accountKit) {
    this(accountKit, new UserDB());
  }

  public LambdaHandler(final AccountKitClient accountKit, final UserDB userDB) {
    this.accountKit = accountKit;
    this.userDB = userDB;
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
          // lookup user details from account kit
          final AccountKitUserAccessToken akToken = accountKit.accessToken(authCode);
          logInfo("AK Token:" + ToStringBuilder.reflectionToString(akToken));
          final AccountKitUser akUser = accountKit.me(akToken.getAccessToken());
          logInfo("AK User:" + ToStringBuilder.reflectionToString(akUser));
          // find user in database
          User user = userDB.getUserByPhone(akUser.getPhone().getNationalNumber());
          // if user exists, update auth info and return full user type
          if (user != null) {
            if (user.getAccountKitUserId() != null) {
              if (!user.getAccountKitUserId().equals(akUser.getId())) {
                logError("AK UserID in DB does not match AK UserID from Account Kit Auth for user:"
                    + user.getId());
                return error("{\"error\": \"Authorization user id mismatch\"}", event);
              }
            } else {
              user.setAccountKitUserId(akUser.getId());
            }
            user.setAccountKitAccessToken(akToken.getAccessToken());
            user.setAccountKitAccessTokenExpiresAt(
                new Timestamp(new Date().getTime() + akToken.getTokenRefreshIntervalSec()));
            // save changes
            user = userDB.updateUser(user);
            // find user by type
            switch (user.getUserType()) {
              case "admin": {
                return success(gson.toJson(userDB.getAdmin(user.getId(), false)), event);
              }
              case "parent": {
                return success(gson.toJson(userDB.getParent(user.getId(), false)), event);
              }
              case "gma": {
                return success(gson.toJson(userDB.getGma(user.getId(), false)), event);
              }
              default: {
                return error("{\"error\": \"Unknown user type\"}", event);
              }
            }
          } else {
            // user with phone not in database
            return error("{\"error\": \"Phone not registered\"}", event);
          }
        } catch (final Exception e) {
          e.printStackTrace(System.err);
          logError("Error:" + e);
          return error("{\"error\": \"Authorization Failure\"}", event);
        }
      } else {
        // CSRF mismatch
        return error("{\"error\": \"CSRF Mismatch\"}", event);
      }
    }
    // empty params
    return error("{\"error\": \"Missing parameters\"}", event);
  }

  private LambdaProxyOutput initAccountKit(final LambdaProxyEvent event, final Context context) {
    final Map<String, String> initValues = Maps.newHashMap();
    initValues.put("appId", APP_ID);
    initValues.put("csrf", CSRF);
    initValues.put("version", VERSION);
    return success(new Gson().toJson(initValues), event);
  }


}
