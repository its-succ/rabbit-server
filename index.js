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
  var child = new Child(req.body);
  child.save(function (err) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(child);
  });

});

// PUT
app.put('/api/children/:id', function (req, res) {

  var child = new Child(req.body);
  Child.findOneAndUpdate({_id:req.params.id}, {$set: {name: child.name, birthday: child.birthday, sex: child.sex}} , {new: true}, function(err, child) {
    if (err || child === null) {
      res.send(err);
      return;
    }
    res.send(child);
  });
});

// DELETE
app.delete('/api/children/:id', function (req, res) {
  var id = req.params.id;
  Child.remove({ _id: id }, function(err) {
          if (err) {
            res.send(err);
          }
      })
  res.send('Delete : ' + 'id = ' + id);
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');
