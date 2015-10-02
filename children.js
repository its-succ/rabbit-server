var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res) {
  console.log('request received');
  res.send('User No.' + req.params.id);
});

router.post('/', function (req, res) {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
