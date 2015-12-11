var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
  name: String,
  birthday: Date,
  sex: String
});

module.exports = mongoose.model('Child', schema);
