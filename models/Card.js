var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
  cardId: String,
  description: String,
  children: [{type: Schema.Types.ObjectId, ref: 'Child'}]
});

module.exports = mongoose.model('Card', schema);
