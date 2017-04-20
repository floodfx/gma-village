package com.gmavillage.lambda.accountkit;

import static org.junit.Assert.assertEquals;

import java.util.Map;

import org.junit.Test;

import com.google.common.collect.Maps;

public class AccoutKitClientTest {

  @Test
  public void testAppSecretProofCalc() {
    final AccoutKitClient client = new AccoutKitClient("appId", "appSecret", "appVersion");
    assertEquals(client.appSecretProof("accessToken"),
        "56141e6642348a6a3cda97dba310c1ec097cec69f830dd1b0154e7c37e379ac0");
  }

  @Test
  public void testUrlFor() {
    final AccoutKitClient client = new AccoutKitClient("appId", "appSecret", "appVersion");
    final Map<String, String> qs = Maps.newHashMap();
    qs.put("a", "b");
    qs.put("c", "d");
    assertEquals(client.urlFor("me", qs), "https://graph.accountkit.com/appVersion/me?a=b&c=d");
  }

}
