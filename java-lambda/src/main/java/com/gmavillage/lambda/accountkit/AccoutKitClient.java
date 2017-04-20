package com.gmavillage.lambda.accountkit;

import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;

import com.google.common.base.Charsets;
import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class AccoutKitClient {

  private static final String BASE_URL = "https://graph.accountkit.com";

  private final String appId;
  private final String appSecret;
  private final String appVersion;

  public AccoutKitClient(final String appId, final String appSecret, final String appVersion) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.appVersion = appVersion;
  }

  public ListenableFuture<Response> me(final String accessToken) {
    final ListeningExecutorService service =
        MoreExecutors.listeningDecorator(Executors.newCachedThreadPool());
    return service.submit(() -> {
      final Map<String, String> qs = Maps.newHashMap();
      qs.put("access_token", accessToken);
      qs.put("appsecret_proof", appSecretProof(accessToken));
      final Request request = new Request.Builder().url(urlFor("me", qs)).build();
      return new OkHttpClient().newCall(request).execute();
    });
  }

  public ListenableFuture<Response> accessToken(final String code) {
    final ListeningExecutorService service =
        MoreExecutors.listeningDecorator(Executors.newCachedThreadPool());
    return service.submit(() -> {
      final String accessToken = Joiner.on("|").join("AA", this.appId, this.appSecret);
      final Map<String, String> qs = Maps.newHashMap();
      qs.put("grant_type", "authorization_code");
      qs.put("code", code);
      qs.put("access_token", accessToken);
      final Request request = new Request.Builder().url(urlFor("me", qs)).build();
      return new OkHttpClient().newCall(request).execute();
    });
  }

  String appSecretProof(final String accessToken) {
    final HashFunction hash = Hashing.hmacSha256(this.appSecret.getBytes());
    return hash.newHasher().putString(accessToken, Charsets.UTF_8).hash().toString();
  }

  String urlFor(final String endpoint, final Map<String, String> queryParams) {
    final StringBuilder builder =
        new StringBuilder(String.format("%s/%s/%s", BASE_URL, this.appVersion, endpoint));
    final List<Map.Entry<String, String>> params = Lists.newArrayList(queryParams.entrySet());
    for (int i = 0; i < params.size(); i++) {
      if (i == 0) {
        builder.append("?");
      }
      final Map.Entry<String, String> entry = params.get(i);
      builder.append(entry.getKey()).append("=").append(entry.getValue());
      if (i != params.size() - 1) {
        builder.append("&");
      }
    }
    return builder.toString();
  }

}
