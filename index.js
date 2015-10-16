//expressモジュールをインポート
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/children');
var db = mongoose.connection;
db.once('open', function(callback) {
  console.log('db connected');
});

// スキーマ定義
var ChildrenSchema = new mongoose.Schema({
  name: String,
  birthday: Date,
  sex: String
});
// モデルとして登録
var Child = mongoose.model('Child',  ChildrenSchema);


// //ルーティング設定
// app.get('/', function (req, res) {
//   res.send('Hello World');
// });



// GET
app.get('/api/children/:id', function (req, res) {
  Child.findOne({_id:req.params.id}, function(err, child) {
    if (err || child === null) {
      res.send(err);
      return;
    }
    res.send(child);
  });
});

// POST
app.post('/api/children', function(req, res) {


    var name = req.body.name;
    var birthday = new Date(req.body.birthday);
    var sex = req.body.sex;

    console.log("create 1 record");
    res.json({
      "name": name,
      "birthday": birthday,
      "sex": sex
    });

});

// PUT
app.put('/api/children/:id', function (req, res) {
  var name = req.body.name;
  var birthday = new Date(req.body.birthday);
  var sex = req.body.sex;

  console.log("update 1 record");
  res.json({
    "name": name,
    "birthday": birthday,
    "sex": sex
  });

});

// DELETE
app.delete('/api/children/:id', function (req, res) {
  Child.remove({ _id: req.param("id") }, function(err) {
          if (err) {
            res.send(err);
            res.redirect('back');
          } else {
            res.redirect('/');
          }
      })
  res.send('Delete : ' + 'id = ' + req.params.id);
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');
