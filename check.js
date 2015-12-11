var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkSchema = new Schema({
    card: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
    time: Date
});
var Check = mongoose.model('Check', checkSchema);

module.exports.checkSchema = checkSchema;
module.exports.Check = Check;
