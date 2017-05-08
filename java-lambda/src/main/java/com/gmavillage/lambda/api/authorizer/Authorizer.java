package com.gmavillage.lambda.api.authorizer;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.api.UnauthorizedExeception;

public interface Authorizer {

  public int authorizeRequest(LambdaProxyEvent event, Context context)
      throws UnauthorizedExeception;

}
