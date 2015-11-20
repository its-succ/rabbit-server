var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = require('./card').cardSchema;

var checkSchema = new Schema({ card: [cardSchema], time: Date });
var Check = mongoose.model('Check', checkSchema);

module.exports.checkSchema = checkSchema;
module.exports.Check = Check;
