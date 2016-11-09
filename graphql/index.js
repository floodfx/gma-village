var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema, Source } = require('graphql');
var fs = require('fs')
var root = require('./src/graphql-root')

// Construct a schema, using GraphQL schema language

const schemaFile = fs.readFileSync("./src/schema.graphql")

var schema = buildSchema(new Source(schemaFile));

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(8080);
console.log('Running a GraphQL API server at localhost:8080/graphql');
