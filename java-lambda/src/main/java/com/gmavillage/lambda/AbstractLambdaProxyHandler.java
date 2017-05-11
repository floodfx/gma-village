package com.gmavillage.lambda;

import static com.gmavillage.lambda.LambdaProxyOutputHelper.error;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.lambda.runtime.LambdaProxyOutput;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.gmavillage.lambda.util.CORS;
import com.gmavillage.model.json.GsonFactory;
import com.google.common.base.MoreObjects;
import com.google.gson.Gson;

public abstract class AbstractLambdaProxyHandler
    implements RequestHandler<LambdaProxyEvent, LambdaProxyOutput>, CORS {

  protected Context context;
  private final Gson gson = GsonFactory.getGson();

  protected abstract LambdaProxyOutput processEvent(final LambdaProxyEvent event,
      final Context context) throws Exception;

  @Override
  public LambdaProxyOutput handleRequest(final LambdaProxyEvent event, final Context context) {
    if (context != null) {
      setContext(context);
    }
    try {
      logInfo("Received event:" + gson.toJson(event));
      final LambdaProxyOutput out = processEvent(event, context);
      logInfo("Writing output:" + gson.toJson(out));
      return out;
    } catch (final Exception e) {
      e.printStackTrace();
      return error("Error Processing Event", requestOrigin(event));
    }
  }

  protected void setContext(final Context context) {
    this.context = context;
  }


  protected String requestOrigin(final LambdaProxyEvent event) {
    if (event.getHeaders() != null) {
      return MoreObjects.firstNonNull(event.getHeaders().get("origin"), "*");
    }
    return "*";
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
