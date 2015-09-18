var express = require('express');
var app = express();

var server = app.listen(3000, function() {
  console.log('Server is running!');
})

//入門でだしてみた
app.get('/', function(req, res) {
  res.send('Hello World!');
})

//app.param('id', function());
//取得
app.get('/api/children/:id', function(req, res) {
  res.send('Hello World! ' + req.params.id);
})

//作成

//更新

//削除
