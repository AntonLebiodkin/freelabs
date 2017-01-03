var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/postgres/user.model');
var UserProfile = require('../models/mongo/user-profile.model');

exports.createUser = function (req, res) {
    if (!req.body.password) {
        res.status(400).send("Not enough data for registration");
        return res.json({
            "error": "bad_request",
            "error_description": "Not enough data for registration. Password is required"
        });
    }
    if (!req.body.username) {
        res.status(400).send("Not enough data for registration");
        return res.json({
            "error": "bad_request",
            "error_description": "Not enough data for registration. Username is required"
        });
    }
    if (!req.body.email) {
        res.status(400).send("Not enough data for registration");
        return res.json({
            "error": "bad_request",
            "error_description": "Not enough data for registration. Email is required"
        });
    }

    const CASUAL_USER_PERMISSION = 1;

    //CREATING HASH FOR PASSWORD
    bcrypt.hash(req.body.password, SALT_WORK_FACTOR, function(err, hash) {
        //SAVING MAIN USER DATA TO POSTGRES
        User.create({
            username: username,
            password: hash,
            permission: CASUAL_USER_PERMISSION
        }).success(function(user) {
            //IF SAVED IN POSTGRES - SAVING IN MONGODB
            var userProfile = new UserProfile({
                userID: user.id,
                username: user.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                avatarURL: req.body.avatarURL || '',
                rating: 0,
                university: String || '',
                messages: []
            });
            userProfile.save(function (err) {
                if (err) {
                    //MONGODB ERROR HANDLER
                    res.status(500).send("Error while creating user");
                    return res.json({
                        "error": "user_create_error",
                        "error_description": "Error while creating user"
                    });
                }
                return res.json({
                    "success": "true"
                });
            })
        }).error(function (error) {
            //POSTGRES ERROR HANDLER
            res.status(500).send("Error while creating user");
            return res.json({
                "error": "user_create_error",
                "error_description": "Error while creating user"
            });
        })
    });

};