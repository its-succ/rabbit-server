var express = require('express');
var router = express.Router();

var Card = require('./models/Card');

router.get('/', function(req, res) {
  Card.find(function(err, cards) {
    if (err || cards == null) {
      return res.send(err);
    }
    res.send(cards);
  })
});

module.exports = router;
