var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/children');

var childSchema = mongoose.Schema({
  name: {type: String, required: '名前を入力してください'}
  birthday: {type: Date, required: '誕生日を入力してください'}
  sex: {type: String, required: '性別を入力してください(M/F)'}
})

var Child = mongoose.model('Child', childSchema);

exports.Child = Child;

var server = app.listen(3000, function() {
  console.log('Server is running!');
});

//入門でだしてみた
app.get('/', function(req, res) {
  res.send('Hello World!');
});

//app.param('id', function());
//取得
app.get('/api/children/:id', function(req, res) {
  //res.send('Hello World! ' + req.params.id);
  var children = {
    "name" : "鈴木一郎",
    "birthday" : "2013-04-01",
    "sex" : "M"
  };

  res.send(children);

  //引数で入ってきたchildrenIDを使って園児情報を取得する
});

//作成
app.post('/api/children', function(req, res) {
  var children = {
    "name" : "鈴木一郎",
    "birthday" : "2013-04-01",
    "sex" : "M"
  };

  res.send(children);
});

//更新
app.put('/api/children/:id', function(req, res) {
  var children = {
    "name" : "鈴木一郎",
    "birthday" : "2013-04-01",
    "sex" : "M"
  };

  res.send(children);
});

//削除
app.delete('/api/children/:id', function(req, res) {
  res.send('DELETE!' + req.params.id);
});
