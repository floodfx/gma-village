package com.gmavillage.lambda.api;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.api.authorizer.Authorizer;
import com.google.common.base.Strings;

public abstract class AbstractApi implements Authorizer {

  protected Context context;

  abstract protected String handleHttpGet(LambdaProxyEvent getEvent, Context context);

  abstract protected String handleHttpPost(LambdaProxyEvent postEvent, Context context);

  abstract protected String handleHttpPut(LambdaProxyEvent putEvent, Context context);

  abstract protected String handleHttpDelete(LambdaProxyEvent deleteEvent, Context context);

  public String handleApiEvent(final LambdaProxyEvent event, final Context context)
      throws UnauthorizedExeception, Exception {

    logInfo("handleApiEvent:" + ToStringBuilder.reflectionToString(event));
    this.context = context;
    final String httpMethod = event.getHttpMethod();
    final int status = authorizeRequest(event, context);
    logInfo("status:" + status);
    if (status != 200) {
      throw new UnauthorizedExeception(status);
    }
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

  @Override
  abstract public int authorizeRequest(LambdaProxyEvent putEvent, Context context)
      throws UnauthorizedExeception;

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
