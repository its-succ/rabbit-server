var express = require('express');
var Child = require('./child').Child;
var router = express.Router();

router.get('/', function(req, res) {
  Child.find({}, function(err, docs) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(docs);
    }
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Child.findById(id, function(err, child) {
    if (child) {
      res.json(child);
    } else {
      res.sendStatus(404);
    }
  });
});

router.post('/', function(req, res) {
  Child.on('error', function() {
    res.sendStatus(500);
  })
  var child = new Child(req.body);
  child.save(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var child = new Child(req.body);
  Child.update({ _id: id}, { $set : {name: child.name, birthday: child.birthday, sex: child.sex} }, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Child.remove({ _id: id}, function(err) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(203);
    }
  });
});

module.exports = router;
