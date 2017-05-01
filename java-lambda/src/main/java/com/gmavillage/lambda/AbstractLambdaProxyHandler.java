package com.gmavillage.lambda;

import java.util.Map;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.gmavillage.lambda.util.CORS;
import com.google.common.collect.Maps;

public abstract class AbstractLambdaProxyHandler
    implements RequestHandler<LambdaProxyEvent, LambdaProxyOutput>, CORS {

  protected Context context;

  protected abstract LambdaProxyOutput processEvent(final LambdaProxyEvent event,
      final Context context) throws Exception;

  @Override
  public LambdaProxyOutput handleRequest(final LambdaProxyEvent event, final Context context) {
    if (context != null) {
      setContext(context);
    }
    logInfo("Received event:" + ToStringBuilder.reflectionToString(event));
    try {
      return processEvent(event, context);
    } catch (final Exception e) {
      logError(e.toString());
      return error("Error Processing Event");
    }
  }

  protected void setContext(final Context context) {
    this.context = context;
  }

  protected LambdaProxyOutput success(final String body, final LambdaProxyEvent event) {
    final Map<String, String> headers = Maps.newHashMap(CORS.HEADERS);
    headers.put("Access-Control-Allow-Origin", requestOrigin(event));
    final LambdaProxyOutput success = new LambdaProxyOutput(200, headers, body);
    logInfo("Returning Success" + ToStringBuilder.reflectionToString(success));
    return success;
  }

  protected LambdaProxyOutput error(final String error) {
    logError("Returning Error with Body" + error);
    return new LambdaProxyOutput(200, CORS.HEADERS, error);
  }

  protected LambdaProxyOutput error404() {
    return new LambdaProxyOutput(404);
  }

  protected String requestOrigin(final LambdaProxyEvent event) {
    return event.getHeaders().get("origin");
  }

  protected void logInfo(final String text) {
    log(text, false);
  }

  protected void logError(final String text) {
    log(text, true);
  }

  protected void log(final String text, final boolean isError) {
    if (this.context != null) {
      this.context.getLogger().log(text);
    } else {
      if (isError) {
        System.err.println(text);
      } else {
        System.out.println(text);
      }
    }
  }

}
