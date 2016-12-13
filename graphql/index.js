var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema, Source } = require('graphql');
var fs = require('fs')
var root = require('./src/graphql-root')
var cors = require('cors')
var config = require('./src/config')
var schema = require('./src/schema')
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { maskErrors } = require('graphql-errors')

var app = express();

var isProd = process.env.NODE_ENV === 'production'

var whitelistedDomains = config.get('CORS_DOMAIN_WHITELIST_CSV').split(',');
console.log(whitelistedDomains)
if(whitelistedDomains.length > 0 && isProd) {
  if(!isProd) {
    whitelistedDomains.push("localhost:8080")
  }
  var whitelist = whitelistedDomains.reduce((acc, domain) => {
    acc.push(`http://${domain}`)
    acc.push(`https://${domain}`)
    return acc
  },[])
  console.log(whitelist)
  var corsOptions = {
    origin: function(origin, callback){
      console.log("origin", origin)
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
    }
  };

  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

maskErrors(schema)

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: !isProd,
// }));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(8080);
console.log('Running a GraphQL API server at localhost:8080/graphql');
