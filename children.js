var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
    res.send('GET children: ' + req.params.id);
});

router.post('/', function(req, res) {
    res.send('POST children');

    var name = req.body.name;
    var birthday = new Date(req.body.birthday);
    var sex = req.body.sex;
    console.log('name: ' + name);
    console.log('birthday: ' + birthday);
    console.log('sex: ' + sex);
});

router.put('/:id', function(req, res) {
    res.send('PUT children: ' + req.params.id);

    var name = req.body.name;
    var birthday = new Date(req.body.birthday);
    var sex = req.body.sex;
    console.log('name: ' + name);
    console.log('birthday: ' + birthday);
    console.log('sex: ' + sex);
});

router.delete('/:id', function(req, res) {
    res.send('DELETE children: ' + req.params.id);
});

module.exports = router;
