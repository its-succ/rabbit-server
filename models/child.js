var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var childSchema = new Schema({ name: String, birthday: Date, sex: String });
var Child = mongoose.model('Child', childSchema);

module.exports.childSchema = childSchema;
module.exports.Child = Child;
