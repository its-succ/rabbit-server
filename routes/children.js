var express = require('express');
var router = express.Router();

var strftime = require('strftime');

var Child = require('../models/Child');
var Card = require('../models/Card');

router.get('/', (req, res) => {
  Child.find({}, (err, children) => {
    if (err) {
      return res.send(err);
    }

    if (!children) {
      return res.sendStatus(404);
    }

    var response = children.map(child => {
      return {
        _id: child._id,
        name: child.name,
        birthday: strftime('%Y-%m-%d', child.birthday),
        sex: child.sex
      };
    });
    res.json(response);
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Child.findById(id, (err, child) => {
    if (err) {
      return res.send(err);
    }

    if (!child) {
      return res.sendStatus(404);
    }

    Card.find({ children: id }, '_id owner children', (err, cards) => {
      res.json({
        _id: child._id,
        name: child.name,
        birthday: strftime('%Y-%m-%d', child.birthday),
        sex: child.sex,
        cards: cards
      });
    });
  });
});

router.post('/', (req, res) => {
  var child = new Child(req.body);
  child.save(err => {
    if (err) {
      return res.send(err);
    }
    res.json({
      _id: child._id,
      name: child.name,
      birthday: strftime('%Y-%m-%d', child.birthday),
      sex: child.sex
    });
  });
});

router.put('/:id', (req, res) => {
  var id = req.params.id;
  Child.findByIdAndUpdate(id, req.body, {new: true}, (err, child) => {
    if (err) {
      return res.send(err);
    }

    if (!child) {
      return res.sendStatus(404);
    }

    Card.find({ children: id }, '_id owner children', (err, cards) => {
      res.json({
        _id: child._id,
        name: child.name,
        birthday: strftime('%Y-%m-%d', child.birthday),
        sex: child.sex
      });
    });
  });
});

router.delete('/:id', (req, res) => {
  Child.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
