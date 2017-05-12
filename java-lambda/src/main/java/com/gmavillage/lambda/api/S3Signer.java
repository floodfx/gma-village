package com.gmavillage.lambda.api;

import java.net.URL;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaProxyEvent;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.gmavillage.model.json.GsonFactory;
import com.google.api.client.util.Maps;
import com.google.gson.Gson;

public class S3Signer {

  private final static String BUCKET = "gmavillage-image";
  private final AmazonS3 s3;
  private final Gson gson = GsonFactory.getGson();

  public S3Signer() {
    this(new AmazonS3Client());
  }

  public S3Signer(final AmazonS3 s3) {
    this.s3 = s3;
  }

  public String signUrl(final LambdaProxyEvent event, final Context context) {

    final UUID objectKey = UUID.randomUUID();

    final LocalDateTime expiration = LocalDateTime.now().plusMinutes(5);

    final GeneratePresignedUrlRequest generatePresignedUrlRequest =
        new GeneratePresignedUrlRequest(BUCKET, objectKey.toString());
    generatePresignedUrlRequest.setMethod(HttpMethod.PUT);
    generatePresignedUrlRequest
        .setExpiration(Date.from(expiration.atZone(ZoneId.systemDefault()).toInstant()));
    final Map<String, String> qs =
        event != null ? event.getQueryStringParameters() : Maps.newHashMap();
    if (qs.get("type") != null) {
      generatePresignedUrlRequest.setContentType(qs.get("type"));
    }

    final URL signedUrl = s3.generatePresignedUrl(generatePresignedUrlRequest);

    final SignResponse response = new SignResponse();
    response.key = objectKey.toString();
    response.url = signedUrl.toString();
    return gson.toJson(response);

  }

  public class SignResponse {
    public String url;
    public String key;

    public SignResponse() {

    }
  }

}
