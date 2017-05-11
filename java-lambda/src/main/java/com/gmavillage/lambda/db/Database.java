package com.gmavillage.lambda.db;

import static com.google.common.base.MoreObjects.firstNonNull;
import static java.lang.System.getenv;

import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Array;
import java.sql.Connection;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.DataSource;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.postgresql.ds.PGPoolingDataSource;

import com.google.api.client.util.Lists;
import com.google.common.io.CharStreams;

public class Database {

  private static final String DB_URL =
      firstNonNull(getenv("DATABASE_URL"), "jdbc:postgresql://localhost:5432/gmavillage-test");
  private static final String DB_USER = getenv("DATABASE_USER");
  private static final String DB_PASS = getenv("DATABASE_PASS");

  public static DataSource postgresDataSource() {
    final PGPoolingDataSource dataSource = new PGPoolingDataSource();
    dataSource.setUrl(DB_URL);
    System.out.println("Set DB URL" + DB_URL);
    if (DB_USER != null) {
      dataSource.setUser(DB_USER);
      System.out.println("Set DB User");
    }
    if (DB_PASS != null) {
      dataSource.setPassword(DB_PASS);
      System.out.println("Set DB Pass");
    }
    dataSource.setMaxConnections(99);
    dataSource.setLogUnclosedConnections(true);
    // dataSource.setDriver(new Driver());
    return dataSource;
  }

  public String loadSqlFile(final String prefix, final String fileName, final String suffix)
      throws IOException {
    final String file = String.format("%s%s%s", prefix, fileName, suffix);
    return CharStreams.toString(
        new InputStreamReader(this.getClass().getClassLoader().getResourceAsStream(file)));
  }

  public String loadSqlFile(final String fileName) throws IOException {
    return loadSqlFile("com/gmavillage/lambda/db/sql/", fileName, ".sql");
  }

  public static List<String> enumListToNameList(final List<? extends Enum> enumList) {
    if (enumList == null) {
      return Lists.newArrayList();
    }
    System.out.println("Processing EnumList" + ToStringBuilder.reflectionToString(enumList));
    return enumList.stream().map(it -> it != null ? it.name() : null).collect(Collectors.toList());
  }

  public static Array createSqlArray(final List<String> list, final DataSource ds)
      throws Exception {
    return createSqlArray(list, "varchar", ds);
  }


  public static Array createSqlArray(final List<String> list, final String type,
      final DataSource ds) throws Exception {
    Array stringArray = null;
    Connection c = null;
    try {
      c = ds.getConnection();
      stringArray = c.createArrayOf(type, list.toArray());
    } finally {
      if (c != null) {
        c.close();
      }
    }
    return stringArray;
  }

}
