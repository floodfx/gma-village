package com.gmavillage.lambda;

import static com.gmavillage.lambda.LambdaProxyOutputHelper.error;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.gmavillage.lambda.util.CORS;

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
      return error("Error Processing Event", requestOrigin(event));
    }
  }

  protected void setContext(final Context context) {
    this.context = context;
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
