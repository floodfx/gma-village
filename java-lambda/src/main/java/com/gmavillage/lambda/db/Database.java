package com.gmavillage.lambda.db;

import static com.google.common.base.MoreObjects.firstNonNull;
import static java.lang.System.getenv;

import java.io.IOException;
import java.io.InputStreamReader;

import javax.sql.DataSource;

import org.postgresql.Driver;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

import com.google.common.io.CharStreams;

public class Database {

  private static final String DB_URL =
      firstNonNull(getenv("DATABASE_URL"), "jdbc:postgresql://localhost:5432/gmavillage-test");
  private static final String DB_USER = getenv("DATABASE_USER");
  private static final String DB_PASS = getenv("DATABASE_PASS");

  public static DataSource postgresDataSource() {
    final SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
    dataSource.setUrl(DB_URL);
    System.out.println("Set DB URL" + DB_URL);
    if (DB_USER != null) {
      dataSource.setUsername(DB_USER);
      System.out.println("Set DB User");
    }
    if (DB_PASS != null) {
      dataSource.setPassword(DB_PASS);
      System.out.println("Set DB Pass");
    }
    dataSource.setDriver(new Driver());
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

}
