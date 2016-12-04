const express = require('express');
const strftime = require('strftime');
const models = require('../models');

const sequelize = models.sequelize;
const router = express.Router();

router.get('/', (req, res) => {
  models.child.findAll().then(children => {
    return children.map(child => {
      return {
        id: child.id,
        firstName: child.firstName,
        lastName: child.lastName,
        birthday: strftime('%Y-%m-%d', child.birthday),
        sex: child.sex
      }
    });
  }).then(children => {
    res.json(children);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  models.child.findById(id).then(child => {
    return {
      id: child.id,
      firstName: child.firstName,
      lastName: child.lastName,
      birthday: strftime('%Y-%m-%d', child.birthday),
      sex: child.sex
    };
  }).then(child => {
    res.json(child);
  });
});

router.post('/', (req, res) => {
  models.child.create(req.body).then(child => {
    res.json({
      firstName: child.firstName,
      lastName: child.lastName,
      birthday: strftime('%Y-%m-%d', child.birthday),
      sex: child.sex
    });
  }).catch(err => {
    return res.send(err);
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  return sequelize.transaction({}, t => {
    models.child.findById(id, {transaction: t}).then(child => {
      return child.updates(req.body);
    });
  }).then(child => {
    res.json({
      id: child.id,
      firstName: child.firstName,
      lastName: child.lastName,
      birthday: strftime('%Y-%m-%d', child.birthday),
      sex: child.sex
    });
  }).catch(function(err) {
    return res.send(err);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return sequelize.transaction({}, t => {
    models.child.findById(id, {transaction: t}).then(child => {
      return child.destroy({transaction: t});
    });
  }).then(() => {
    res.sendStatus(200);
  }).catch(function(err) {
    return res.send(err);
  });
});

module.exports = router;
