package com.gmavillage.lambda.api.authorizer;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.accountkit.AccountKitClient;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.lambda.model.accountkit.AccountKitUser;
import com.gmavillage.model.User;

public class AuthHelper {

  private static final String BEARERSPACE = "Bearer ";
  private static final String AUTHORIZATION = "Authorization";

  public static String accessTokenFromAuthHeader(final LambdaProxyEvent event) {
    if (event.getHeaders() != null) {
      final String authHeader = event.getHeaders().get(AUTHORIZATION);
      if (authHeader != null && authHeader.startsWith(BEARERSPACE)) {
        return authHeader.substring(BEARERSPACE.length());
      }
    }
    return null;
  }

  public static User userByAccountKitAccessToken(final String accessToken,
      final AccountKitClient accountKit, final UserDB userDB) throws Exception {
    final AccountKitUser akUser = accountKit.me(accessToken);
    if (akUser != null) {
      final User user = userDB.getUserByAccountKitUserId(akUser.getId());
      if (user == null) {
        throw new RuntimeException("Unauthorized");
      }
      return user;
    }
    return null;
  }
}
