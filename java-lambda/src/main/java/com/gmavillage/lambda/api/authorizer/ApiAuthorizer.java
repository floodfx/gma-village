package com.gmavillage.lambda.api.authorizer;


import static com.google.common.base.MoreObjects.firstNonNull;
import static java.lang.System.getenv;

import java.util.Arrays;

import com.amazonaws.services.lambda.runtime.AuthPolicy;
import com.amazonaws.services.lambda.runtime.AuthPolicy.HttpMethod;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.TokenAuthorizerContext;
import com.gmavillage.lambda.accountkit.AccountKitClient;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.lambda.model.accountkit.AccountKitUser;
import com.gmavillage.model.User;
import com.google.common.base.Joiner;

public class ApiAuthorizer implements RequestHandler<TokenAuthorizerContext, AuthPolicy> {

  private static final String APP_ID = firstNonNull(getenv("AK_APP_ID"), "AK_APP_ID");
  private static final String CSRF = firstNonNull(getenv("CSRF"), "CSRF");
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
  public AuthPolicy handleRequest(final TokenAuthorizerContext input, final Context context) {

    final String accessToken = input.getAuthorizationToken();

    try {
      // lookup user info from token
      final AccountKitUser akUser = accountKit.me(accessToken);
      final User user = userDB.getUserByAccountKitUserId(akUser.getId());
      if (user == null) {
        throw new RuntimeException("Unauthorized");
      }
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
      if ("admin".equals(user.getUserType())) {
        return new AuthPolicy(principalId,
            AuthPolicy.PolicyDocument.getAllowAllPolicy(region, awsAccountId, restApiId, stage));
      }
      // otherwise, users can only update their own data
      if (isUserOwnedResource(user, resourceParts)) {
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

  private boolean isUserOwnedResource(final User user, final String[] resource) {
    return (user.getId().equals(Integer.parseInt(resource[resource.length - 1])));
  }

}

