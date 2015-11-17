var express = require('express');
var children = require('./children')
var app = express();

app.get('/children', children.findAll);
app.get('/children/:id', children.findbyId);
// app.post('/children', children.addChild);
// app.put('/children/:id', children.updateChild);
// app.delete('/children/:id', children.deleteChild);

var server = app.listen(3000, function() {
  console.log('Server is running!');
  console.log('index.js Server is running!');
});
