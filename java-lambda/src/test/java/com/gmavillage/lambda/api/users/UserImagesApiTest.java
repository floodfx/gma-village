package com.gmavillage.lambda.api.users;

import static org.mockito.Mockito.mock;

import org.apache.commons.fileupload.FileItemIterator;
import org.junit.Before;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.gmavillage.lambda.db.UserDB;
import com.gmavillage.model.Admin;
import com.gmavillage.model.Gma;
import com.gmavillage.model.Parent;
import com.gmavillage.model.User;
import com.gmavillage.model.json.GsonFactory;
import com.gmavillage.test.TestUtils;
import com.google.common.io.ByteStreams;
import com.google.gson.Gson;

import delight.fileupload.FileUpload;

public class UserImagesApiTest {



  TestUtils testUtils = new TestUtils();

  LambdaProxyEvent postImageSuccess;

  User user1, user2, user3;
  Admin admin;
  Gma gma;
  Parent parent;

  UserDB userDB;

  private final Gson gson = GsonFactory.getGson();

  @Before
  public void loadEvent() throws Exception {

    postImageSuccess =
        testUtils.loadJsonFile("test_LambdaProxyEvent_usersapi_POST_userimages_success.json");

    // setup users
    user1 = testUtils.generateUser();
    user1.setId(1);
    user2 = testUtils.generateUser();
    user2.setId(2);
    user3 = testUtils.generateUser();
    user3.setId(3);

    admin = testUtils.generateAdmin();
    admin.setId(4);

    gma = testUtils.generateGma();
    gma.setId(5);

    parent = testUtils.generateParent();
    parent.setId(6);

    // setup userDB
    userDB = mock(UserDB.class);
  }



  @Test
  public void testParse() throws Exception {
    final FileItemIterator iterator =
        FileUpload.parse(
            ByteStreams
                .toByteArray(this.getClass().getClassLoader().getResourceAsStream("mulitpart.bin")),
            "image/png");

    postImageSuccess.setBody(new String(loadBinaryFile("mulitpart.bin")));
    final UserImagesApi api = new UserImagesApi();
    api.bodyToMultipart(postImageSuccess);

  }


  public byte[] loadBinaryFile(final String name) throws Exception {
    return ByteStreams.toByteArray(this.getClass().getClassLoader().getResourceAsStream(name));
  }



}
