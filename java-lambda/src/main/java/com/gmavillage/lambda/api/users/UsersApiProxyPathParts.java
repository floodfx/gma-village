package com.gmavillage.lambda.api.users;

import javax.annotation.Nullable;

import com.google.auto.value.AutoValue;

@AutoValue
abstract public class UsersApiProxyPathParts {
  public static UsersApiProxyPathParts create(@Nullable final String userType,
      @Nullable final Integer userId) {
    return new AutoValue_UsersApiProxyPathParts(userType, userId);
  }

  abstract public @Nullable String userType();

  abstract public @Nullable Integer userId();
}
