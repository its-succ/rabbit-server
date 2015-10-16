var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Child = mongoose.model('Child', { name: String, birthday: Date, sex: String });

router.get('/:id', function (req, res) {
  var id = req.params.id;
  console.log('ID: ' + id);
  Child.findById(id, function (err, child) {
    if (child) {
      res.json(child);
    } else {
      res.sendStatus(404);
    }
  });
});

router.post('/', function (req, res) {
  var child = new Child(req.body);
  child.save(function (err) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }

    console.log(child);
    return res.send('Child Registered. ID: ' + child._id);
  });
});

router.put('/:id', function (req, res) {
  Child.update({_id: req.params.id}, req.body, {}, function (err, raw) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }

    console.log(raw);
    return res.send('Child updated.');
  });
});

module.exports = router;
