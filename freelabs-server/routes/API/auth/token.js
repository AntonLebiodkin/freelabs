var express = require('express');
var router = express.Router();

var User = require('../../../models/postgres/').User;
var AccessToken = require('../../../models/mongo/access-token');

var bcrypt = require('bcrypt');
var crypto = require('crypto');
const SALT_WORK_FACTOR = 10;

var CLIENTID = 'a823jkas87y3kjakjhsd';
var CLIENTSECRET = 'dksu287aokjfaouiusdia7127a5skd';

/* GET users listing. */
router.post('/', function(req, res, next) {
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
        User.findOne({
            where: {
                username: req.body.username
            }
        }).then(function (user) {
            console.log(user);
            if (bcrypt.compareSync(req.body.password, user.password) && user){
                var accessToken = crypto.randomBytes(32).toString('hex');
                var expiresIn = 3600;
                var refreshToken = crypto.randomBytes(32).toString('hex');

                var token = new AccessToken({
                    token: accessToken,
                    username: user.username,
                    expiresIn: expiresIn,
                    refreshToken: refreshToken
                });
                token.save();
                return res.json({
                    "access_token": accessToken,
                    "expires_in": expiresIn,
                    "refresh_token": refreshToken
                });
            } else {
                //WRONG USER DATA
                return res.json({
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
});

module.exports = router;