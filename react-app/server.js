var express = require('express');
var app = express();

// Use the built-in express middleware for serving static files from './public'
app.use('/', express.static('build'));

// Start the server
var server = app.listen(process.env.PORT || '8080', function () {
  console.log('App listening on port %s', server.address().port);
});
