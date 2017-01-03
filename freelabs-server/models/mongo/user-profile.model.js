var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var config = require('../../config');
const SALT_WORK_FACTOR = 10;

var UserProfileSchema = new Schema({
    userID: String,
    firstName: String,
    lastName: String,
    username: {
        type: String,
        required: true
    },
    avatarURL: String,
    rating: { type: Number, default: 0 },
    university: Number,
    messages: [ { type: Number, ref: 'MessageSchema' } ]
});
UserProfileSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        expiresIn: parseInt(expiry.getTime() / 1000),
    }, config.secret); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
UserProfileSchema.pre('save', function (next) {
    var self = this;
    UserProfile.find({username : self.username}, function (err, docs) {
        if (!docs.length){
            next();
        }else{
            console.log('user exists: ',self.name);
            next(new Error("User exists!"));
        }
    });
}) ;

var UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;