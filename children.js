var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/children');
var db = mongoose.connection;
db.once('open', function(callback) {
  console.log('db connected');
});

var childSchma = mongoose.Schema({
  name: String,
  birthday: Date,
  sex: String
});
var Child = mongoose.model('Child', childSchma);

var router = express.Router();

router.get('/:id', function(req, res) {
  Child.findOne({_id:req.params.id}, function(err, child) {
    if (err || child === null) {
      res.send(err);
      return;
    }
    res.send(child);
  });
});

router.post('/', function(req, res) {
  console.log(req.body);
  var child = new Child();
  child.name = req.body.name;
  child.birthday = new Date(req.body.birthday);
  child.sex = req.body.sex;
  child.save(function(err) {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    console.log("saved");
    res.send(child);
  })
});

router.put('/:id', function(req, res) {
  console.log(req.body);
  Child.findOne({_id:req.params.id}, function(err, child) {
    if (err || child === null) {
      res.send(err);
      return;
    }
    child.name = req.body.name;
    child.birthday = new Date(req.body.birthday);
    child.sex = req.body.sex;
    child.save(function(err) {
      if (err) {
        console.error(err);
        res.send(err);
        return;
      }
      console.log("saved");
      res.send(child);
    })
  });
});

router.delete('/:id', function(req, res) {
  Child.findOne({_id:req.params.id}, function(err, child) {
    if (err || child === null) {
      res.send(err);
      return;
    }
    child.remove();
    console.log("deleted")
    res.end();
  });
});

module.exports = router;
