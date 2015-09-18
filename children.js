var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET children');
});

router.post('/', function(req, res) {
    res.send('POST children');
});

module.exports = router;
