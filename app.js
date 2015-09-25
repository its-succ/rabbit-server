var express = require('express');
var bodyParser = require('body-parser');

var children = require('./src/children');
var app = express();

app.use(bodyParser.json());

app.use('/api/children', children);

var port = process.env.port || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Rabbit Server app listening at http://%s:%s', host, port);
});
