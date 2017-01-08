var postgresModels = require('../../models/postgres');
var UserProfile = require('../../models/mongo/index').userProfile;
var User = postgresModels.User;

var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

module.exports = function (req, res, next) {
    UserProfile.remove({ username: 'admin'}).exec();
    const ADMIN_USER_PERMISSION = 2;
    var password = 'admin';
    //CREATING HASH FOR PASSWORD
    bcrypt.hash(password, SALT_WORK_FACTOR, function(err, hash) {
        var username = 'admin';
        var email = 'axel.lebiodkin@gmail.com';
        var userProfile = new UserProfile({
            username: username,
            password: hash,
            permission: ADMIN_USER_PERMISSION,
            email: email,

            firstName: 'Anton',
            lastName: 'Lebiodkin',
            avatarURL: 'https://pp.vk.me/c636226/v636226944/2a259/sUPSwA8M3RU.jpg',
            rating: 5,
            university: 0,
            messages: []
        });
        return userProfile.save()
                          .then(function (userProfile) {
                              return res.json({
                                  success: true
                              });
                          }).catch(function (error) {
                              return res.json({
                                  "error": "user_create_error",
                                  "error_description": "Error while creating user",
                                  "message": error.message
                              });
                          });
    })
};

