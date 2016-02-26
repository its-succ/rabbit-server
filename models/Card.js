var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
  _id: String,
  owner: String,
  children: [{type: Schema.Types.ObjectId, ref: 'Child'}]
});

module.exports = mongoose.model('Card', schema);
