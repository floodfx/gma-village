package com.gmavillage.model.json;

import java.lang.reflect.Type;
import java.util.TimeZone;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class TimeZoneSerDe implements JsonDeserializer<TimeZone>, JsonSerializer<TimeZone> {

  @Override
  public JsonElement serialize(final TimeZone src, final Type typeOfSrc,
      final JsonSerializationContext context) {
    return new JsonPrimitive(src.getID());
  }


  @Override
  public TimeZone deserialize(final JsonElement json, final Type typeOfT,
      final JsonDeserializationContext context) throws JsonParseException {
    return TimeZone.getTimeZone(json.getAsString());
  }



}
