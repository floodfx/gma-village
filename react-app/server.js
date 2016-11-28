var express = require('express');
var basicAuth = require('basic-auth');
var config = require('./config') // file not in source control for security
var app = express();

var UN = config.get('GMA_AUTH_USERNAME');
var PW = config.get('GMA_AUTH_PASSWORD');

// use basic auth to protect the page
var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === UN && user.pass === PW) {
    return next();
  } else {
    return unauthorized(res);
  };
};

// Use the built-in express middleware for serving static files from './public'
app.use('/', auth, express.static('build'));

// redirect to static react app
app.get('/gmas', (req, res) => {
  res.redirect('/');
});

// Start the server
var server = app.listen(process.env.PORT || '8080', function () {
  console.log('App listening on port %s', server.address().port);
});
