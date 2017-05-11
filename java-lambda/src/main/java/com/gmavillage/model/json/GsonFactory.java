package com.gmavillage.model.json;

import static com.google.gson.FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES;

import com.gmavillage.model.Neighborhood;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class GsonFactory {

  public static final Gson getGson() {
    return new GsonBuilder() //
        .setFieldNamingPolicy(LOWER_CASE_WITH_UNDERSCORES) //
        .registerTypeAdapter(Neighborhood.class, new NeighborhoodGsonSerDe()) //
        .create();

  }

}
