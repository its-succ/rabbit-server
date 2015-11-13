var express = require('express');
var router = express.Router();

var Child = require('./child').Child;
var Card = require('./card').Card;

router.get('/:id', function (req, res) {
  var id = req.params.id;
  console.log('ID: ' + id);
  Child.findById(id, function (err, child) {
    if (child) {
      res.json(child);
    } else {
      res.sendStatus(404);
    }
  });
});

router.post('/', function (req, res) {
  var child = new Child(req.body);
  child.save(function (err) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log(child);
      res.send('Child Registered. ID: ' + child._id);
    }
  });
});

router.put('/:id', function (req, res) {
  Child.update({_id: req.params.id}, req.body, {}, function (err, raw) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log(raw);
      res.send('Child updated.');
    }
  });
});

router.delete('/:id', function (req, res) {
  Child.remove({_id: req.params.id}, function (err) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send('Child deleted.');
    }
  });
});
module.exports = router;
