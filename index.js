var express = require('express');
var webApp = express();

webApp.get('/', function (req, res) {
  res.send('Hello World!');
});

webApp.get('/api/children/:id', function (req, res) {
  console.log('request received');
  res.send('User No.' + req.params.id);
});

var server = webApp.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
