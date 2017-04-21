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

  public static DataSource postgresDataSource() {
    final SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
    dataSource.setUrl(DB_URL);
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
