const express = require('express');
const models = require('../models');

const sequelize = models.sequelize;
const router = express.Router();

router.get('/', (req, res) => {
  models.relationship.findAll().then(relationships => {
    res.json(relationships);
  }).catch(err => {
    res.status(500).end(err);
  });
});

router.get('/:id', (req, res) => {
  models.relationship.findById(req.params.id).then(relationship => {
    res.json(relationship);
  }).catch(err => {
    res.status(500).end(err);
  });
});

router.post('/', (req, res) => {
  models.relationship.create(req.body).then(relationship => {
    res.json(relationship);
  }).catch(err => {
    return res.send(err);
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  return sequelize.transaction(t => {
    return models.relationship.findById(id, {transaction: t}).then(relationship => {
      return relationship.update(req.body, {transaction: t});
    });
  }).then(relationship => {
    res.json(relationship);
  }).catch(function(err) {
    return res.send(err);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return sequelize.transaction(t => {
    return models.relationship.findById(id, {transaction: t}).then(relationship => {
      return relationship.destroy({transaction: t});
    });
  }).then(() => {
    res.status(200).end();
  }).catch(function(err) {
    return res.status(500).json(err);
  });
});

module.exports = router;
