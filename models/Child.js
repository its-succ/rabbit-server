var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var childSchema = new Schema({
    name: String,
    birthday: Date,
    sex: String
});

module.exports = mongoose.model('Child', childSchema);
