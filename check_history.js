var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkHistorySchema = new Schema({
    child: [{ type: Schema.Types.ObjectId, ref: 'Child' }],
    attend: [{ type: Schema.Types.ObjectId, ref: 'Check' }],
    leave: [{ type: Schema.Types.ObjectId, ref: 'Check' }]
});
var CheckHistory = mongoose.model('CheckHistory', checkHistorySchema);

module.exports.checkHistorySchema = checkHistorySchema;
module.exports.CheckHistory = CheckHistory;
