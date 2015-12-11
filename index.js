var express = require('express');
var bodyParser = require('body-parser');
var children = require('./children')
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*POSTの確認用コードstart*/
// ejsのレイアウトをoff
app.set('view options', { layout: false });
// 初回アクセスの処理
app.get('/', function(req, res){
  res.render('post.ejs', { name: "aaa", birthday:"2015", sex:"M"});
});
/*POSTの確認用コード end*/


// app.get('/children', children.findAll);
app.get('/children/:id', children.findbyId);
app.post('/children', children.addChild);
app.put('/children/:id', children.updateChild);
app.delete('/children/:id', children.deleteChild);

var server = app.listen(3000, function() {
  console.log('Server is running!');
  console.log('index.js Server is running!');
});
