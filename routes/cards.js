const express = require('express');
const models = require('../models');

const sequelize = models.sequelize;
const router = express.Router();


// カード全件取得
router.get('/', (req, res) => {
  models.card.findAll().then(cards => {
    res.json(cards);
  }).catch(err => {
    res.status(500).end(err);
  });
});

// カード１件取得
router.get('/:id', (req, res) => {
  models.card.findById(req.params.id).then(card => {
    res.json(card);
  }).catch(err => {
    res.status(500).end(err);
  });
});

// カード登録
router.post('/', (req, res) => {
  models.card.create(req.body).then(card => {
    res.json(card);
  }).catch(err => {
    return res.send(err);
  });
});

// カード更新
router.put('/:id', (req, res) => {
  const id = req.params.id;
  return sequelize.transaction(t => {
    return models.card.findById(id, {transaction: t}).then(card => {
      return card.update(req.body, {transaction: t});
    });
  }).then(card => {
    res.json(card);
  }).catch(function(err) {
    return res.send(err);
  });
});

// カード削除
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return sequelize.transaction(t => {
    return models.card.findById(id, {transaction: t}).then(card => {
      return card.destroy({transaction: t});
    });
  }).then(() => {
    res.status(200).end();
  }).catch(function(err) {
    return res.send(err);
  });
});

module.exports = router;
