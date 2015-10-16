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

router.get('/', function(req, res) {
  Child.find(function(err, children) {
    if (err || children == null) {
      res.send(err);
      return;
    }
    res.send(children);
  });
});

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
  var child = new Child(req.body);
  child.save(function(err) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(child);
  })
});

router.put('/:id', function(req, res) {
  var child = new Child(req.body);
  child._id = req.params.id;
  Child.findOneAndUpdate({_id:req.params.id}, child, {new: true}, function(err, child) {
    if (err || child === null) {
      res.send(err);
      return;
    }
    res.send(child);
  });
});

router.delete('/:id', function(req, res) {
  Child.findOne({_id:req.params.id}, function(err, child) {
    if (err || child === null) {
      res.send(err);
      return;
    }
    child.remove();
    res.end();
  });
});

module.exports = router;
