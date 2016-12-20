const express = require('express');
const models = require('../models');

const sequelize = models.sequelize;
const router = express.Router();

router.get('/', (req, res) => {
  models.protector.findAll().then(protectors => {
    res.json(protectors);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  models.protector.findById(id).then(protector => {
    res.json(protector);
  });
});

router.post('/', (req, res) => {
  models.protector.create(req.body).then(protector => {
    res.json(protector);
  }).catch(err => {
    return res.send(err);
  });
});

router.put('/:id/children/:childId', (req, res) => {
  const id = req.params.id;
  const childId = req.params.childId;
  return sequelize.transaction(t => {
    return models.protector.findById(id, {transaction: t}).then(protector => {
      const relationshipId = req.body.relationshipId;
      return protector.addChildren(childId, {relationshipId: relationshipId, transaction: t});
    });
  }).then(result => {
    res.json(result)
  }).catch(function(err) {
    return res.send(err);
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  return sequelize.transaction(t => {
    return models.protector.findById(id, {transaction: t}).then(protector => {
      return protector.update(req.body, {transaction: t});
    });
  }).then(protector => {
    res.json(protector)
  }).catch(function(err) {
    return res.send(err);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return sequelize.transaction(t => {
    return models.protector.findById(id, {transaction: t}).then(protector => {
      return protector.destroy({transaction: t});
    });
  }).then(() => {
    res.status(200).end();
  }).catch(function(err) {
    return res.send(err);
  });
});

module.exports = router;
