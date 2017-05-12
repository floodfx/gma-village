package com.gmavillage.model.json;

import java.lang.reflect.Type;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class OffsetDateTimeSerDe
    implements JsonDeserializer<OffsetDateTime>, JsonSerializer<OffsetDateTime> {

  public static final DateTimeFormatter ISO_8601 = DateTimeFormatter.ISO_DATE_TIME;


  @Override
  public JsonElement serialize(final OffsetDateTime src, final Type typeOfSrc,
      final JsonSerializationContext context) {
    return new JsonPrimitive(src.format(ISO_8601));
  }


  @Override
  public OffsetDateTime deserialize(final JsonElement json, final Type typeOfT,
      final JsonDeserializationContext context) throws JsonParseException {
    return OffsetDateTime.parse(json.getAsString(), ISO_8601);
  }



}
