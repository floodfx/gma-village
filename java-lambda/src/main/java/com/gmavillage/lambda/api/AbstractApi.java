package com.gmavillage.lambda.api;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.google.common.base.Strings;

public abstract class AbstractApi {

  protected Context context;

  abstract protected String handleHttpGet(LambdaProxyEvent getEvent, Context context);

  abstract protected String handleHttpPost(LambdaProxyEvent postEvent, Context context);

  abstract protected String handleHttpPut(LambdaProxyEvent putEvent, Context context);

  abstract protected String handleHttpDelete(LambdaProxyEvent deleteEvent, Context context);

  public String handleApiEvent(final LambdaProxyEvent event, final Context context)
      throws Exception {
    this.context = context;
    final String httpMethod = event.getHttpMethod();
    logInfo("httpMethod:" + httpMethod);
    switch (httpMethod) {
      case "GET":
        return handleHttpGet(event, context);
      case "POST":
        return handleHttpPost(event, context);
      case "PUT":
        return handleHttpPut(event, context);
      case "DELETE":
        return handleHttpDelete(event, context);
      default:
        throw new Exception("Unsupported Http Method:" + httpMethod);
    }
  }

  protected String getLastPathPart(final String path) {
    if (Strings.isNullOrEmpty(path)) {
      return null;
    }
    final String[] parts = path.split("/");
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
    return null;
  }

  protected Integer getLastPathPartInteger(final String path) {
    final String lastPart = getLastPathPart(path);
    if (lastPart != null) {
      try {
        return Integer.parseInt(lastPart);
      } catch (final NumberFormatException e) {
        return null;
      }
    }
    return null;
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
