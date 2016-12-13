// var { buildSchema, Source } = require('graphql');
var fs = require('fs')
var { makeExecutableSchema } = require('graphql-tools');
var resolvers = require('./resolvers')

const schemaFile = fs.readFileSync("./src/schema.graphql", {encoding: "UTF-8"})
// var schema = buildSchema(new Source(schemaFile));

const schema = makeExecutableSchema({
  typeDefs: schemaFile,
  resolvers,
})

module.exports = schema
