package com.gmavillage.model.json;

import java.lang.reflect.Type;

import org.apache.commons.lang3.builder.ToStringBuilder;

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

  public static void main(final String[] args) {
    final NeighborhoodGsonSerDe serde = new NeighborhoodGsonSerDe();
    for (final Neighborhood n : Neighborhoods.NEIGHBORHOODS) {
      final JsonElement json = serde.serialize(n, Neighborhood.class, null);
      System.out.println(json);
      final Neighborhood n2 = serde.deserialize(json, Neighborhood.class, null);
      System.out.println(ToStringBuilder.reflectionToString(n2));
    }
  }


}
