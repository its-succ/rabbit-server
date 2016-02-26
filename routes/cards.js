var express = require('express');
var router = express.Router();

var Card = require('../models/Card');

// カード全件取得
router.get('/', (req, res) => {
  Card.find((err, cards) => {
    if (err) {
      return res.send(err);
    }
    res.send(cards);
  });
});

// カード１件取得
router.get('/:id', (req, res) => {
  Card.findOne({_id:req.params.id}, (err, cards) => {
    if (err) {
      return res.send(err);
    }
    res.send(cards);
  });
});

// カード登録
router.post('/', (req, res) => {
  var card = new Card(req.body);
  card.save(err => {
    if (err) {
      return res.send(err);
    }
    res.send(card);
  });
});

// カード更新
router.put('/:id', (req, res) => {
  var card = new Card(req.body);
  card._id = req.params.id;
  Card.findOneAndUpdate({_id:req.params.id}, card, {new: true}, (err, card) => {
    if (err) {
      return res.send(err);
    }
    res.send(card);
  });
});

// カード削除
router.delete('/:id', (req, res) => {
  Card.findOne({_id:req.params.id}, (err, card) => {
    if (err) {
      return res.send(err);
    }
    card.remove();
    res.end();
  });
});

module.exports = router;
