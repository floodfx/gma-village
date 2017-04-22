package com.gmavillage.lambda.accountkit;

import static org.junit.Assert.assertEquals;

import java.net.URLEncoder;
import java.util.Map;

import org.junit.Test;

import com.google.common.base.Charsets;
import com.google.common.base.Joiner;
import com.google.common.collect.Maps;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class AccoutKitClientTest {

  @Test
  public void testAppSecretProofCalc() {
    final AccountKitClient client = new AccountKitClient("appId", "appSecret", "appVersion");
    assertEquals(client.appSecretProof("accessToken"),
        "56141e6642348a6a3cda97dba310c1ec097cec69f830dd1b0154e7c37e379ac0");
  }

  @Test
  public void testUrlFor() {
    final AccountKitClient client = new AccountKitClient("appId", "appSecret", "appVersion");
    final Map<String, String> qs = Maps.newHashMap();
    qs.put("a", "b|d");
    qs.put("c", "d");
    assertEquals(client.urlFor("me", qs).toString(),
        "https://graph.accountkit.com/appVersion/me?a=b|d&c=d");
  }


  @Test
  public void testAccessToekn() throws Exception {
    final AccountKitClient client =
        new AccountKitClient("1864284563828976", "dd4a6b4779833fd73202784d9c85d524", "v1.1");
    final String accessToken =
        Joiner.on("|").join("AA", "1864284563828976", "dd4a6b4779833fd73202784d9c85d524");
    final Map<String, String> qs = Maps.newHashMap();
    qs.put("grant_type", "authorization_code");
    qs.put("code",
        "AQBLamVPKfAdJrJuyJN0pEtGBGPyAxzyfm3wDl7ziJpNlp1JORmneyBU77U93m7BJA9OqiXfLV2z1i_JuiSbBY7MeYmfetGEmEgBEy7P8JQ10EFxEfYpihnDPEkHilQ9UBSYqc5KLE4IQzpURwS2vTYtb3SNAzA04cb44mL0uU5j0XJreRsTXwtDbx0ovovnKp5nAXdoGH93YSJbo7OMzLin3e1gjhcc-sF_wZH0dxML-zMAnk5FVHZTJWljdJ1CMcBq1Gz9pwNKBa5mc5GVtHIy");
    qs.put("access_token", URLEncoder.encode(accessToken, Charsets.UTF_8.name()));

    final Request request = new Request.Builder().url(client.urlFor("access_token", qs)).build();
    System.out.println("request" + request);
    final Response response = new OkHttpClient().newCall(request).execute();
    System.out.println("Response:" + response.code() + " " + response.body().string());

    /**
     * https://graph.accountkit.com/v1.1/access_token?access_token=AA%257C1864284563828976%
     * 257Cdd4a6b4779833fd73202784d9c85d524&code=
     * AQDL_KfTxEPcIt1d5eeZBjPkEPqjJUdL1WRhKHXn6TruB3llMYhZGG8GFUbn4TT4p_noDbbI1V0LfG81TuOSN7lWjWwv5pGMbX__2RwyciGonA0ePP3XkyVJROfwkAsAYM4H
     * -t2rNCTyjM9VpbOBks6mlcJOkfpEysFdZwbSQ3OTijCPLHcvrseAIvKpbRUzeNPx6VhTnhiUM--
     * AaiCIngg28L19tL6nrjdRxorvV65ZZH-U_5NjUFrDmQEfZivaZ17N9xSaZMQaupO9LGwtM_W_&grant_type=
     * authorization_code
     */
  }

}
