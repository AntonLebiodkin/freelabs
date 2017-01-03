var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    from: { type: Number, ref: 'UserProfile' },
    to: { type: Number, ref: 'UserProfile' },
    messageBody: String,
    sentDate: { type: Date, default: Date.now }
});

var MessageSchema = mongoose.model('MessageSchema', messageSchema);

module.exports = MessageSchema;