package com.gmavillage.lambda.api.authorizer;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Map;

import org.junit.Test;

import com.amazonaws.services.lambda.runtime.AuthPolicy;
import com.amazonaws.services.lambda.runtime.TokenAuthorizerContext;
import com.gmavillage.lambda.accountkit.AccountKitClient;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.lambda.model.accountkit.AccountKitUser;
import com.gmavillage.lambda.model.accountkit.AccountKitUser.Phone;
import com.gmavillage.model.Admin;
import com.gmavillage.model.Parent;
import com.gmavillage.test.TestUtils;
import com.google.gson.Gson;

public class ApiAuthorizerTest {

  TestUtils testUtils = new TestUtils();

  @Test
  public void testAdminUser() throws Exception {
    // setup account kit
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    akUser.setPhone(new Phone("number", "countryPrefix", "nationalNumber"));
    when(ak.me("accessToken")).thenReturn(akUser);

    // setup userDB
    final Admin a = testUtils.generateAdmin();
    a.setId(1);
    a.setAccountKitAccessToken("accessToken");
    a.setAccountKitUserId("akUserId");
    final UserDB userDB = mock(UserDB.class);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(a);

    // call authorizer
    final ApiAuthorizer authorizer = new ApiAuthorizer(ak, userDB);
    final String methodArn = methodArn("GET", "/users");
    final TokenAuthorizerContext input =
        new TokenAuthorizerContext("TOKEN", "accessToken", methodArn);
    final AuthPolicy policy = authorizer.handleRequest(input, null);
    final Map<String, Object> doc = policy.getPolicyDocument();
    System.out.println("doc" + new Gson().toJson(doc));
    final Map<String, Object>[] statements = (Map<String, Object>[]) doc.get("Statement");
    final Map<String, Object> statement = statements[0];
    assertPolicyStatement(statement, "execute-api:Invoke", "Allow",
        "arn:aws:execute-api:REGION:ACCOUNT_ID:API_ID/STAGE/*/*");
  }

  @Test
  public void testNonAdminAcessingTheirDataUser() throws Exception {
    // setup account kit
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    akUser.setPhone(new Phone("number", "countryPrefix", "nationalNumber"));
    when(ak.me("accessToken")).thenReturn(akUser);

    // setup userDB
    final Integer parentId = 1;
    final Parent p = testUtils.generateParent();
    p.setId(parentId);
    p.setAccountKitAccessToken("accessToken");
    p.setAccountKitUserId("akUserId");
    final UserDB userDB = mock(UserDB.class);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(p);

    // call authorizer
    final ApiAuthorizer authorizer = new ApiAuthorizer(ak, userDB);
    final String methodArn = methodArn("GET", "/users/" + parentId);
    final TokenAuthorizerContext input =
        new TokenAuthorizerContext("TOKEN", "accessToken", methodArn);
    final AuthPolicy policy = authorizer.handleRequest(input, null);
    final Map<String, Object> doc = policy.getPolicyDocument();
    System.out.println("doc" + new Gson().toJson(doc));
    final Map<String, Object>[] statements = (Map<String, Object>[]) doc.get("Statement");
    final Map<String, Object> statement = statements[0];
    assertPolicyStatement(statement, "execute-api:Invoke", "Allow",
        "arn:aws:execute-api:REGION:ACCOUNT_ID:API_ID/STAGE/GET/users/1");
  }

  @Test
  public void testNonAdminAcessingDataNotOwnedByThem() throws Exception {
    // setup account kit
    final AccountKitClient ak = mock(AccountKitClient.class);
    final AccountKitUser akUser = new AccountKitUser();
    akUser.setId("akUserId");
    akUser.setPhone(new Phone("number", "countryPrefix", "nationalNumber"));
    when(ak.me("accessToken")).thenReturn(akUser);

    // setup userDB
    final Integer parentId = 1;
    final Parent p = testUtils.generateParent();
    p.setId(parentId);
    p.setAccountKitAccessToken("accessToken");
    p.setAccountKitUserId("akUserId");
    final UserDB userDB = mock(UserDB.class);
    when(userDB.getUserByAccountKitUserId("akUserId")).thenReturn(p);

    // call authorizer
    final ApiAuthorizer authorizer = new ApiAuthorizer(ak, userDB);
    final String methodArn = methodArn("GET", "/users/2");
    final TokenAuthorizerContext input =
        new TokenAuthorizerContext("TOKEN", "accessToken", methodArn);
    final AuthPolicy policy = authorizer.handleRequest(input, null);
    final Map<String, Object> doc = policy.getPolicyDocument();
    System.out.println("doc" + new Gson().toJson(doc));
    final Map<String, Object>[] statements = (Map<String, Object>[]) doc.get("Statement");
    final Map<String, Object> statement = statements[1];
    assertPolicyStatement(statement, "execute-api:Invoke", "Deny",
        "arn:aws:execute-api:REGION:ACCOUNT_ID:API_ID/STAGE/GET/users/2");
  }

  private void assertPolicyStatement(final Map<String, Object> statement,
      final String expectedAction, final String expectedEffect, final String expectedResource) {
    assertEquals(statement.get("Action"), expectedAction);
    assertEquals(statement.get("Effect"), expectedEffect);
    assertEquals(((String[]) statement.get("Resource"))[0], expectedResource);
  }

  private String methodArn(final String method, final String resourcePath) {
    // arn:aws:execute-api:<regionId>:<accountId>:<apiId>/<stage>/<method>/<resourcePath>
    return String.format("arn:aws:execute-api:REGION:ACCOUNT_ID:API_ID/STAGE/%s/%s", method,
        resourcePath);
  }

}
