var express = require('express');
var router = express.Router();

var strftime = require('strftime');

var Child = require('./child').Child;
var Card = require('./card').Card;

router.get('/', function (req, res) {
  Child.find({}, function (err, children) {
    if (children) {
      var childrenJson = children.map(function (child) {
        return {
          _id: child._id,
          name: child.name,
          birthday: strftime('%F', child.birthday),
          sex: child.sex
        };
      });
      res.json(childrenJson);
    } else {
      res.sendStatus(404);
    }
  });
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  console.log('ID: ' + id);
  Child.findById(id, function (err, child) {
    if (child) {
      Card.find({ children: id }, '_id owner children', function(err, cards) {
        res.json({
          _id: child._id,
          name: child.name,
          birthday: strftime('%F', child.birthday),
          sex: child.sex,
          cards: cards
        });
      });
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
      res.sendStatus(200);
    }
  });
});

router.put('/:id', function (req, res) {
  Child.findByIdAndUpdate(req.params.id, req.body, function (err, child) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log(child);
      res.sendStatus(200);
    }
  });
});

router.delete('/:id', function (req, res) {
  Child.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
