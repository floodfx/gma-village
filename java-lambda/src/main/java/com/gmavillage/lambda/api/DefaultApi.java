package com.gmavillage.lambda.api;

import com.amazonaws.services.kms.model.UnsupportedOperationException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;

public class DefaultApi extends AbstractApi {
  @Override
  protected String handleHttpGet(final LambdaProxyEvent getEvent, final Context context) {
    throw new UnsupportedOperationException("GET");
  }

  @Override
  protected String handleHttpPost(final LambdaProxyEvent postEvent, final Context context) {
    throw new UnsupportedOperationException("POST");
  }

  @Override
  protected String handleHttpPut(final LambdaProxyEvent putEvent, final Context context) {
    throw new UnsupportedOperationException("PUT");
  }

  @Override
  protected String handleHttpDelete(final LambdaProxyEvent deleteEvent, final Context context) {
    throw new UnsupportedOperationException("DELETE");
  }

}
