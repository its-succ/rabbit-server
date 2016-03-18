"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rabbit' });
});

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

//一覧取得
router.get('/children', function(req, res) {
  console.log('園児一覧取得');

  Child.find({}, function(err, results) {
    if(err) {
      res.send({'error': 'エラーがおきました'});
    } else {
       console.log('園児一覧取得成功しました' + results);
      //  res.json(results);
       res.send(results);
     }
  })
});



//登録
// var child = new Child();
// child.name ='テスト　太郎';
// child.birthday = '2010-03-12';
// child.sex = 'M';
// child.save(function(err) {
//   if(err) {console.log(err);}
// });




module.exports = router;
