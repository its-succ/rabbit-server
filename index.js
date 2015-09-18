var express = require('express');
var app = express();

var children = require('./children');

app.use('/api/children', children);

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('listening at http://%s:%s', host, port);
});
