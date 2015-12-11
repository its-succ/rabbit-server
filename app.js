var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rabbit');
var db = mongoose.connection;
db.once('open', function(callback) {
  console.log('db connected');
});

var app = express();

app.use(bodyParser.json());

var children = require('./children');
app.use('/api/children', children);

var cards = require('./cards');
app.use('/api/cards', cards);

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('listening at http://%s:%s', host, port);
});
