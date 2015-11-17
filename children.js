"use strict";

var mongoose = require('mongoose');

//mongoDB定義
var childSchema = new mongoose.Schema({
  name: {type: String},
  birthday: {type: Date},
  sex: {type: String}
})
//モデル化
var Child = mongoose.model('Child', childSchema);

//mongoDB使用
mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('connected', function() {
  console.log('mongoose URI locates' + 'mongodb://localhost/test');
})

//登録
// var child = new Child();
// child.name ='テスト　太郎';
// child.birthday = '2010-03-12';
// child.sex = 'M';
// child.save(function(err) {
//   if(err) {console.log(err);}
// });

//一覧取得
exports.findAll = function(req, res) {
  console.log('園児一覧取得');

  Child.find({}, function(err, results) {
    if(err) {
      res.send({'error': 'エラーがおきました'});
    } else {
      console.log('園児一覧取得成功しました' + results);
      res.json(results);
    }
  })
};

exports.findbyId = function(req, res) {
  var id = req.params.id;
  console.log('園児取得' + id);

  Child.findById(id, function(err, result) {
    if(err) {
      res.send({'error': 'エラーがおきました'});
    } else {
      console.log('園児取得成功しました' + JSON.stringify(result));
      res.json(result);
    }
  })
};
