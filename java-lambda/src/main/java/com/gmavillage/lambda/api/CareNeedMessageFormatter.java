package com.gmavillage.lambda.api;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

import com.gmavillage.model.CareNeed;
import com.gmavillage.model.Child;
import com.gmavillage.model.Neighborhood;
import com.gmavillage.model.Neighborhoods;
import com.gmavillage.model.Parent;

public class CareNeedMessageFormatter {

  private static final DateTimeFormatter START_TIME_FORMAT =
      DateTimeFormatter.ofPattern("MMM d, h:mma");
  private static final DateTimeFormatter END_TIME_FORMAT = DateTimeFormatter.ofPattern("h:mma");

  public static String neighborhood(final CareNeed careNeed) {
    final Neighborhood neighborhood = careNeed.getNeighborhood();
    if (Neighborhoods.OTHER_OAKLAND.getLabel().equals(neighborhood.getLabel())) {
      return careNeed.getOtherNeighborhood();
    }
    return neighborhood.getName();
  }

  public static String format(final OffsetDateTime dateTime, final DateTimeFormatter formatter) {
    return dateTime.format(formatter);
  }

  public static String formatPhone(final String phone) {
    final StringBuilder builder = new StringBuilder();
    builder.append(phone.substring(0, 3)).append("-");
    builder.append(phone.substring(3, 6)).append("-");
    builder.append(phone.substring(6));
    return builder.toString();
  }


  public static String toMessageFormat(final CareNeed careNeed) {
    final Parent parent = careNeed.getParent();
    final Set<Child> children = careNeed.getChildren();
    final StringBuilder builder = new StringBuilder();
    builder.append("Gma Village Parent ").append(parent.getFirstName()).append(" ");
    builder.append("needs care for ").append(children.size()).append(" kids ");
    builder.append("in ").append(neighborhood(careNeed)).append(" ");
    builder.append("on ").append(format(careNeed.getStartTime(), START_TIME_FORMAT)).append("-");
    builder.append(format(careNeed.getEndTime(), END_TIME_FORMAT)).append(". ");
    builder.append("Text ").append(formatPhone(parent.getPhone())).append(" to setup interview.");

    return builder.toString();
  }

}
