var express = require('express');
var bodyParser = require('body-parser');
var webApp = express();

webApp.use(bodyParser.json());

var children = require('./children');
webApp.use('/api/children', children);

var server = webApp.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

