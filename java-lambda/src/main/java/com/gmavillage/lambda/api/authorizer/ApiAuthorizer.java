package com.gmavillage.lambda.api.authorizer;


import static com.google.common.base.MoreObjects.firstNonNull;
import static java.lang.System.getenv;

import java.util.Arrays;
import java.util.Map;

import com.amazonaws.services.lambda.runtime.AuthPolicy;
import com.amazonaws.services.lambda.runtime.AuthPolicy.HttpMethod;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.TokenAuthorizerContext;
import com.gmavillage.lambda.accountkit.AccountKitClient;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.model.User;
import com.gmavillage.model.UserType;
import com.google.common.base.Joiner;

public class ApiAuthorizer
    implements RequestHandler<TokenAuthorizerContext, AuthPolicy>, Authorizer {

  private static final int UNAUTHORIZED_401 = 401;
  private static final int FORBIDDEN_403 = 403;
  private static final int OK_200 = 200;

  private static final String APP_ID = firstNonNull(getenv("AK_APP_ID"), "AK_APP_ID");
  private static final String VERSION = firstNonNull(getenv("AK_APP_VERSION"), "AK_APP_VERSION");
  private static final String APP_SECRET = firstNonNull(getenv("AK_APP_SECRET"), "AK_APP_SECRET");
  private final AccountKitClient accountKit;
  private final UserDB userDB;

  public ApiAuthorizer() {
    this(new AccountKitClient(APP_ID, APP_SECRET, VERSION), new UserDB());
  }

  public ApiAuthorizer(final AccountKitClient accountKit, final UserDB userDB) {
    this.accountKit = accountKit;
    this.userDB = userDB;
  }

  @Override
  public int authorizeRequest(final LambdaProxyEvent event, final Context context) {

    try {
      final String accessToken = AuthHelper.accessTokenFromAuthHeader(event);
      if (accessToken != null) {
        final User user = AuthHelper.userByAccountKitAccessToken(accessToken, accountKit, userDB);

        if (user == null) {
          System.err.println("Access token did not return user.");
          return UNAUTHORIZED_401;
        } else if (UserType.ADMIN.equals(user.getUserType())) {
          return OK_200;
        } else {
          final Map<String, String> pathParams = event.getPathParameters();
          final String proxyPath = pathParams.get("proxy");
          final boolean userOwnedResource =
              isResourceAllowed(user, event.getHttpMethod(), proxyPath);
          if (userOwnedResource) {
            return OK_200;
          } else {
            System.err.println(
                "User does not own resource: user_id:" + user.getId() + " path:" + proxyPath);
            return FORBIDDEN_403;
          }
        }
      }
    } catch (final Exception e) {
      e.printStackTrace();
    }

    return UNAUTHORIZED_401;
  }

  @Override
  public AuthPolicy handleRequest(final TokenAuthorizerContext input, final Context context) {

    final String accessToken = input.getAuthorizationToken();

    try {
      // lookup user info from token
      final User user = AuthHelper.userByAccountKitAccessToken(accessToken, accountKit, userDB);
      final String principalId = user.getId().toString();

      // load variables for policy
      final String methodArn = input.getMethodArn();
      final String[] arnPartials = methodArn.split(":");
      final String region = arnPartials[3];
      final String awsAccountId = arnPartials[4];
      final String[] apiGatewayArnPartials = arnPartials[5].split("/");
      final String restApiId = apiGatewayArnPartials[0];
      final String stage = apiGatewayArnPartials[1];
      final String httpMethod = apiGatewayArnPartials[2];
      String[] resourceParts = null;
      if (apiGatewayArnPartials.length >= 4) {
        resourceParts = Arrays.copyOfRange(apiGatewayArnPartials, 3, apiGatewayArnPartials.length);
      } else {
        // resource path is empty
        throw new RuntimeException("Unauthorized");
      }

      // if user is admin, then we allow all
      if (UserType.ADMIN.equals(user.getUserType())) {
        return new AuthPolicy(principalId,
            AuthPolicy.PolicyDocument.getAllowAllPolicy(region, awsAccountId, restApiId, stage));
      }
      // otherwise, users can only update their own data
      if (isResourceAllowed(user, httpMethod, Joiner.on("/").join(resourceParts))) {
        return new AuthPolicy(principalId,
            AuthPolicy.PolicyDocument.getAllowOnePolicy(region, awsAccountId, restApiId, stage,
                HttpMethod.valueOf(httpMethod), Joiner.on("/").join(resourceParts)));
      } else {
        return new AuthPolicy(principalId,
            AuthPolicy.PolicyDocument.getDenyOnePolicy(region, awsAccountId, restApiId, stage,
                HttpMethod.valueOf(httpMethod), Joiner.on("/").join(resourceParts)));
      }


    } catch (final Exception e) {
      // return 401 Unauthorized
      System.err.println(e);
      throw new RuntimeException("Unauthorized");
    }

  }


  public boolean isResourceAllowed(final User user, final String httpMethod, final String path) {
    if (path == null || user == null || user.getId() == null || httpMethod == null) {
      return false;
    }
    switch (user.getUserType()) {
      case ADMIN:
        return true;
      case PARENT:
        return isValidParentPath(user.getId(), httpMethod, path);
      case GMA:
        return isValidGmaPath(user.getId(), httpMethod, path);
      default:
        return false;
    }
  }

  public static boolean isValidParentPath(final Integer parentId, final String httpMethod,
      final String path) {
    final String GET_GMAS = "GET/gmas";
    final String GET_SELF = "GET/parents/" + parentId;
    final String PUT_SELF = "PUT/parents/" + parentId;
    final String methodPath = httpMethod + "/" + path;
    System.out.println("methodPath:" + methodPath);
    if (GET_GMAS.equals(methodPath)) {
      return true;
    } else if (GET_SELF.equals(methodPath)) {
      return true;
    } else if (PUT_SELF.equals(methodPath)) {
      return true;
    }
    return false;
  }

  public static boolean isValidGmaPath(final Integer gmaId, final String httpMethod,
      final String path) {
    final String GET_PARENTS = "GET/parents";
    final String GET_SELF = "GET/gmas/" + gmaId;
    final String PUT_SELF = "PUT/gmas/" + gmaId;
    final String methodPath = httpMethod + "/" + path;
    System.out.println("methodPath:" + methodPath);
    if (GET_PARENTS.equals(methodPath)) {
      return true;
    } else if (GET_SELF.equals(methodPath)) {
      return true;
    } else if (PUT_SELF.equals(methodPath)) {
      return true;
    }
    return false;
  }

  public static UserType userTypeString(final String pathPart) {
    if (pathPart != null) {
      switch (pathPart) {
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

