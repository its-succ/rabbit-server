var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
    nfcId: String,
    author: String,
    children: [{type: Schema.Types.ObjectId, ref: 'Child' }]
});
var Card = mongoose.model('Card', cardSchema);

module.exports.cardSchema = cardSchema;
module.exports.Card = Card;
