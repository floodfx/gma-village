package com.gmavillage.lambda.api.users;

import javax.annotation.Nullable;

import com.google.auto.value.AutoValue;

@AutoValue
abstract public class ProxyPathParts {
  public static ProxyPathParts create(@Nullable final String type, @Nullable final Integer id) {
    return new AutoValue_ProxyPathParts(type, id);
  }

  abstract public @Nullable String type();

  abstract public @Nullable Integer id();
}
