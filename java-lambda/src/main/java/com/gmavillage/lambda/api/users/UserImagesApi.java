package com.gmavillage.lambda.api.users;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.api.DefaultApi;
import com.gmavillage.lambda.api.UnauthorizedExeception;
import com.gmavillage.lambda.api.authorizer.ApiAuthorizer;
import com.gmavillage.lambda.api.authorizer.Authorizer;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.model.json.GsonFactory;
import com.google.gson.Gson;

import delight.fileupload.FileUpload;

public class UserImagesApi extends DefaultApi {

  private final UserDB userDB;
  private final Authorizer authorizer;

  private final Gson gson = GsonFactory.getGson();

  public UserImagesApi() {
    this(new UserDB(), new ApiAuthorizer());
  }

  public UserImagesApi(final UserDB userDB) {
    this(userDB, null);
  }

  public UserImagesApi(final UserDB userDB, final Authorizer authorizer) {
    this.userDB = userDB;
    this.authorizer = authorizer;
  }

  @Override
  public int authorizeRequest(final LambdaProxyEvent event, final Context context)
      throws UnauthorizedExeception {
    if (authorizer != null) {
      return authorizer.authorizeRequest(event, context);
    }
    return 200;
  }

  @Override
  protected String handleHttpPost(final LambdaProxyEvent postEvent, final Context context) {
    return null;
  }

  @Override
  protected String handleHttpPut(final LambdaProxyEvent putEvent, final Context context) {
    return null;
  }

  public void bodyToMultipart(final LambdaProxyEvent event) throws Exception {
    final byte[] data = event.getBody().getBytes();
    final String contentType = event.getHeaders().get("Content-Type");
    final FileItemIterator iterator = FileUpload.parse(data, contentType);
    while (iterator.hasNext()) {
      final FileItemStream item = iterator.next();

      if (!item.isFormField()) {
        System.out.println("Here!" + item.getContentType());
        // final InputStream stream = item.openStream();
      }

    }
  }


}
