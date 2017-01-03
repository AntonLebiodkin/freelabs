var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accessTokenSchema = new Schema({
    token: String,
    username: String,
    expiresIn: Number,
    refreshToken: String
});

var AccessToken = mongoose.model('AccessToken', accessTokenSchema);

module.exports = AccessToken;