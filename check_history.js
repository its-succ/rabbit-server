var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var childSchema = require('./check').checkSchema;
var checkSchema = require('./check').checkSchema;

var checkHistorySchema = new Schema({ child: [childSchema], attend: [checkSchema], leave: [checkSchema] });
var CheckHistory = mongoose.model('CheckHistory', checkHistorySchema);

module.exports.checkHistorySchema = checkHistorySchema;
module.exports.CheckHistory = CheckHistory;
