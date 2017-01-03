var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proposalSchema = new Schema({
    user: {
        type: Number,
        ref: 'UserProfile'
    },
    price: Number,
    message: String,
    daysCount: String
});

var ProposalSchema = mongoose.model('ProposalSchema', proposalSchema);

module.exports = ProposalSchema;