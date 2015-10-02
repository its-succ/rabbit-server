var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Child = mongoose.model('Child', { name: String, birthday: Date, sex: String });

module.exports.Child = Child;
