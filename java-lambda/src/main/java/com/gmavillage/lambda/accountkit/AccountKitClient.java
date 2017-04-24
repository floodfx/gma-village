package com.gmavillage.lambda.accountkit;

import static com.google.common.base.MoreObjects.firstNonNull;
import static com.google.gson.FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES;
import static java.lang.Integer.parseInt;
import static java.lang.System.getenv;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.gmavillage.lambda.model.accountkit.AccountKitUser;
import com.gmavillage.lambda.model.accountkit.AccountKitUserAccessToken;
import com.google.common.base.Charsets;
import com.google.common.base.Joiner;
import com.google.common.collect.Maps;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class AccountKitClient {

  private static final Integer TIMEOUT_SECS =
      parseInt(firstNonNull(getenv("ACCOUNTKIT_TIMEOUT_SECS"), "3"));

  private final HttpUrl baseUrl = HttpUrl.parse("https://graph.accountkit.com");

  private final String appId;
  private final String appSecret;
  private final String appVersion;
  private final OkHttpClient httpClient;
  private final Gson gson;

  public AccountKitClient(final String appId, final String appSecret, final String appVersion) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.appVersion = appVersion;
    this.httpClient = new OkHttpClient().newBuilder() //
        .connectTimeout(TIMEOUT_SECS, TimeUnit.SECONDS) //
        .readTimeout(TIMEOUT_SECS, TimeUnit.SECONDS).build();
    this.gson = new GsonBuilder().setFieldNamingPolicy(LOWER_CASE_WITH_UNDERSCORES).create();
  }

  public String meAsString(final String accessToken) throws IOException {
    final Map<String, String> qs = Maps.newHashMap();
    qs.put("access_token", accessToken);
    qs.put("appsecret_proof", appSecretProof(accessToken));

    return fetch("me", qs);
  }

  public String accessTokenAsString(final String code) throws IOException {
    final String accessToken = Joiner.on("|").join("AA", this.appId, this.appSecret);
    final Map<String, String> qs = Maps.newHashMap();
    qs.put("grant_type", "authorization_code");
    qs.put("code", code);
    qs.put("access_token", URLEncoder.encode(accessToken, Charsets.UTF_8.name()));

    return fetch("access_token", qs);
  }

  public AccountKitUser me(final String accessToken) throws IOException {
    final Map<String, String> qs = Maps.newHashMap();
    qs.put("access_token", accessToken);
    qs.put("appsecret_proof", appSecretProof(accessToken));

    return gson.fromJson(fetch("me", qs), AccountKitUser.class);
  }

  public AccountKitUserAccessToken accessToken(final String code) throws IOException {
    final String accessToken = Joiner.on("|").join("AA", this.appId, this.appSecret);
    final Map<String, String> qs = Maps.newHashMap();
    qs.put("grant_type", "authorization_code");
    qs.put("code", code);
    qs.put("access_token", URLEncoder.encode(accessToken, Charsets.UTF_8.name()));

    return gson.fromJson(fetch("access_token", qs), AccountKitUser.class);
  }

  String fetch(final String endpoint, final Map<String, String> qs) throws IOException {
    final Request request = new Request.Builder().url(urlFor(endpoint, qs)).build();
    final Response response = httpClient.newCall(request).execute();
    if (!response.isSuccessful()) {
      throw new IOException("Error" + response);
    }
    return response.body().string();
  }


  String appSecretProof(final String accessToken) {
    final HashFunction hash = Hashing.hmacSha256(this.appSecret.getBytes());
    return hash.newHasher().putString(accessToken, Charsets.UTF_8).hash().toString();
  }

  HttpUrl urlFor(final String endpoint, final Map<String, String> queryParams) {
    final HttpUrl.Builder builder = baseUrl.newBuilder("/" + this.appVersion + "/" + endpoint);
    for (final Map.Entry<String, String> entry : queryParams.entrySet()) {
      builder.addQueryParameter(entry.getKey(), entry.getValue());
    }
    return builder.build();
  }

}
