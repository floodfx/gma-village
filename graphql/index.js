var express = require('express');
var graphqlHTTP = require('express-graphql');
var fileUpload = require('express-fileupload');
var bearerToken = require('express-bearer-token');
var { buildSchema, Source } = require('graphql');
var fs = require('fs')
var root = require('./src/graphql-root')
var cors = require('cors')
var config = require('./src/config')
var schema = require('./src/schema')
var { isAuthenticated, loadAccountKitUserMiddleware } = require('./src/auth/auth')
var { loadAppUserMiddleware } = require('./src/user/user')
var images = require('./src/images/upload-images');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { maskErrors } = require('graphql-errors')

var app = express();

var isProd = process.env.NODE_ENV === 'production'

console.log("Starting server in mode", (isProd ? "prod" : "dev"))

var whitelistedDomains = config.get('CORS_DOMAIN_WHITELIST_CSV').split(',');
if(whitelistedDomains.length > 0) {
  if(!isProd) {
    whitelistedDomains.push("localhost:3000")
  }
  var whitelist = whitelistedDomains.reduce((acc, domain) => {
    acc.push(`http://${domain}`)
    acc.push(`https://${domain}`)
    return acc
  },[])
  console.log("whitelisted domains", whitelist)
  var corsOptions = {
    origin: function(origin, callback){
      console.log("origin", origin)
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(originIsWhitelisted ? null : `Bad Origin: ${origin}`, originIsWhitelisted);
    }
  };

  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

maskErrors(schema)

// USE "Authorization: Bearer <token>" Header for Authorization
app.use(bearerToken());

// GRAPHQL
app.use(
  '/graphql',
  bodyParser.json(),
  loadAccountKitUserMiddleware,
  loadAppUserMiddleware,
  graphqlExpress(request => ({    
    schema: schema,
    context: {
      accountKitUser: request.accountKitUser,
      appUser: request.appUser
    },
  }))
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// FILE UPLOAD
app.use(fileUpload());
app.post('/profilePhoto',
  loadAccountKitUserMiddleware,
  isAuthenticated,
  images.sendUploadToGCS,
  function(req, res) {
    var file;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    file = req.files.file;
    console.log(file.cloudStoragePublicUrl)
    if(file.cloudStorageError) {
      console.log("Error:", file.cloudStorageError)
      res.status(500).send("Internal Error");
    }
    else {
      console.log("Success:", file.cloudStoragePublicUrl)
      res.send(JSON.stringify({image_url:file.cloudStoragePublicUrl}));
    }
  })

function logErrors (err, req, res, next) {
  console.error("request", req, "error.stack", err.stack);
  next(err);
}

app.use(logErrors)

app.listen(8080);
console.log('Running a GraphQL API server at localhost:8080/graphql');
