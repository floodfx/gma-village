package com.gmavillage.lambda.accountkit;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.gmavillage.lambda.util.CORS;
import com.gmavillage.lambda.util.DebugHelper;

public class LambdaHandler implements RequestHandler<LambdaProxyEvent, LambdaProxyOutput>, CORS {

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
    String body = "Hello: ";
    switch (event.getHttpMethod()) {
      case "GET":
        body += "GET";
        break;
      default:
        body += "Default";

    }
    return new LambdaProxyOutput(200, CORS.HEADERS, body);
  }

}
