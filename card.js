var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var childSchema = require('./child').childSchema;

var cardSchema = new Schema({ nfcId: String, author: String, children: [childSchema] });
var Card = mongoose.model('Card', cardSchema);

module.exports.cardSchema = cardSchema;
module.exports.Card = Card;
