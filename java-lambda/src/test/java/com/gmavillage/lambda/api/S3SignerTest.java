package com.gmavillage.lambda.api;

import org.junit.Assert;
import org.junit.Test;

import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.gmavillage.lambda.api.S3Signer.SignResponse;
import com.gmavillage.model.json.GsonFactory;
import com.google.gson.Gson;

public class S3SignerTest {

  @Test
  public void test() {
    final AmazonS3 s3 = new AmazonS3Client(new ProfileCredentialsProvider("gmavillage"));

    final S3Signer signer = new S3Signer(s3);
    final String json = signer.signUrl(null, null);
    final Gson gson = GsonFactory.getGson();
    final SignResponse response = gson.fromJson(json, SignResponse.class);
    System.out.println("Response: ObjectKey" + response.key + "  SignedUrl" + response.url);
    Assert.assertNotNull(response.key);
    Assert.assertNotNull(response.url);

  }

}
