var postgresModels = require('../models/postgres');
var User = postgresModels.User;
var UserProfile = require('../models/mongo/user-profile.model');

var bcrypt = require('bcrypt');
var crypto = require('crypto');
const SALT_WORK_FACTOR = 10;
var jwt    = require('jsonwebtoken');
var utils = require("../utils");

var CLIENTID = 'a823jkas87y3kjakjhsd';
var CLIENTSECRET = 'dksu287aokjfaouiusdia7127a5skd';

exports.authenticate = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password) {
        return res.json({
            "error": "access_denied",
            "error_description": "Invalid username or password"
        });
    }
    if (req.body.client_id != CLIENTID) {
        return res.json({
            "error": "access_denied",
            "error_description": "The resource owner or authorization server denied the request."
        });
    }
    if (req.body.client_secret != CLIENTSECRET) {
        return res.json({
            "error": "access_denied",
            "error_description": "The resource owner or authorization server denied the request."
        });
    }
    if (req.body.grant_type == 'password') {
        User.find({
            where: {
                username: username
            }
        }).then(function (user) {
            if (!user) {
                return res.status(401).json({
                    "error": "access_denied",
                    "error_description": "Wrong username or password"
                });
            }
            if (user.verifyPassword(req.body.password) && user) {
                console.log("User authenticated, generating token");
                //THIS FUNCTION NOW IS HANDLING OUR TOKEN SENDING
                utils.create(user, req, res);
            } else {
                return res.status(401).json({
                    "error": "access_denied",
                    "error_description": "The resource owner or authorization server denied the request."
                });
            }
        })
    } else {
        //WRONG GRANT_TYPE
        return res.json({
            "error": "access_denied",
            "error_description": "The resource owner or authorization server denied the request."
        });
    }
}
