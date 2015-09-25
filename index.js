//expressモジュールをインポート
var express = require('express');
var app = express();

//ルーティング設定
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/api/children/:id', function (req, res) {
  res.send('userId:' + req.params.id);
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/api/children', function(req, res) {
    var user_id = req.body.id;
    res.send('userId' + user_id);

});

//以下、ルーティング情報があればここに追記していく

app.listen(3000);
console.log('Server running at http://localhost:3000/');
