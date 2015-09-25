var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json([{ name: '鈴木一郎', birthday: new Date(2013, 3, 1, 0, 0, 0, 0), sex: 'M' }]);
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  if (id == 1) {
    res.json({ name: '鈴木一郎', birthday: new Date(2013, 3, 1, 0, 0, 0, 0), sex: 'M' });
  } else {
    res.sendStatus(404);
  }
});

router.post('/', function(req, res) {
  console.log(req.body);
  res.json({req.body);
});

router.put('/:id', function(req, res) {
  console.log(req.body);
  res.json(req.body);
});

router.delete('/:id', function(req, res) {
  res.sendStatus(203);
});

module.exports = router;
