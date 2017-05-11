package com.gmavillage.model.json;

import java.lang.reflect.Type;

import com.gmavillage.model.Neighborhood;
import com.gmavillage.model.Neighborhoods;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class NeighborhoodGsonSerDe
    implements JsonDeserializer<Neighborhood>, JsonSerializer<Neighborhood> {


  @Override
  public JsonElement serialize(final Neighborhood src, final Type typeOfSrc,
      final JsonSerializationContext context) {
    return new JsonPrimitive(src.getLabel());
  }


  @Override
  public Neighborhood deserialize(final JsonElement json, final Type typeOfT,
      final JsonDeserializationContext context) throws JsonParseException {
    return Neighborhoods.byLabel(json.getAsJsonPrimitive().getAsString());
  }


}
