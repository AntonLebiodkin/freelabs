var postgresModels = require('../models/postgres');
var User = postgresModels.User;
var UserProfile = require('../models/mongo/user-profile.model.js');

var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
var CLIENTSECRET = 'dksu287aokjfaouiusdia7127a5skd';

function setUserInfo(request) {
    return {
        _id: request._id,
        username: request.username,
        email: request.email
    };
}

function generateToken(user) {
    return jwt.sign(user, CLIENTSECRET, {
        expiresIn: 10080 // in seconds
    });
}
exports.registration = function (req, res, next) {
    if (req.body.client_id != CLIENTID) {
        return res.status(422).json({
            "error": "access_denied",
            "error_description": "The resource owner or authorization server denied the request."
        });
    }
    if (req.body.client_secret != CLIENTSECRET) {
        return res.status(422).json({
            "error": "access_denied",
            "error_description": "The resource owner or authorization server denied the request."
        });
    }
    if (!req.body.username || !req.body.password || !req.body.email) {
        return res.status(422).json({
            "error": "bad_request",
            "error_description": "Not enough data to create user."
        });
    }
    bcrypt.hash(req.body.password, SALT_WORK_FACTOR, function(err, hash) {
        //SAVING MAIN USER DATA TO POSTGRES
        User.find({
            where: {
                username: req.body.username
            }
        }).then(function(existingUser) {
            //CHECK IF USER NOT EXIST
            if (existingUser) {
                return res.status(422).send({ error: 'That username address is already in use.' });
            }
            const CASUAL_USER_PERMISSION = 2;
            //POSTGRES CREATE USER ACCOUNT
            return User.create({
                email: email,
                password: hash,
                permission: CASUAL_USER_PERMISSION
            });

        }).then(function(user){
            var username = req.body.username;
            var email = req.body.email;
            //IF SAVED IN POSTGRES - SAVING IN MONGODB
            var userProfile = new UserProfile({
                userID: user.id,
                username: username,
                firstname: firstName,
                lastName: lastName,
                email: email,
                avatarURL: 'https://pp.vk.me/c636226/v636226944/2a253/dWUWc0DYmnM.jpg',
                rating: 0,
                university: req.body.university || '',
                messages: []
            });
            return userProfile.save();
        }).then(function (userProfile) {
            let userInfo = setUserInfo(userProfile);
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });
        }).catch(function (error) {
            return res.json({
                "error": "user_create_error",
                "error_description": "Error while creating user",
                "message": error.message
            });
        })
    });
};