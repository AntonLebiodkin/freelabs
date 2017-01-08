var  path = require('path');
var  util = require('util');
var  redis = require("redis");
var  client = redis.createClient();
var  config = require("./config");
var  jsonwebtoken = require("jsonwebtoken");
var  TOKEN_EXPIRATION = 60;
var  TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;

function UnauthorizedAccessError(code, error) {
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "UnauthorizedAccessError";
    this.message = error.message;
    this.code = code;
    this.status = 401;
    this.inner = error;
}
UnauthorizedAccessError.prototype = Object.create(Error.prototype);
UnauthorizedAccessError.prototype.constructor = UnauthorizedAccessError;

module.exports.fetch = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        if (part.length === 2) {
            var token = part[1];
            return token;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports.create = function (user, req, res) {
    if (!user) {
        return res.status(400).json({
            "error": 'User data cannot be empty.'
        })
    }

    var data = {
        id: user.id,
        username: user.username,
        permission: user.permission,
        email: user.email,
        token: jsonwebtoken.sign({ id: user.id }, config.secret, {
            expiresIn: TOKEN_EXPIRATION_SEC
        })
    };

    var decoded = jsonwebtoken.decode(data.token);

    data.token_exp = decoded.exp;
    data.token_iat = decoded.iat;

    client.set(data.token, JSON.stringify(data), function (err, reply) {
       if (err) {
           return res.status(400).json({
               "error": err
           })
       }
       if (reply) {
           client.expire(data.token, TOKEN_EXPIRATION_SEC, function (err, reply) {
               if (err) {
                   return res.status(400).json({
                       "error": "Can not set the expire value for the token key"
                   });
               }
               if (reply) {
                   req.user = data;
                   return res.status(200).json({user: req.user});
               } else {
                   return res.status(400).json({
                       "error": "Expiration not set on redis"
                   });
               }
           });
       } else {
           return res.status(400).json({
               "error": "Token not set in redis"
           });
       }
    });
    return data;
};

module.exports.retrieve = function (id, done) {
    if (!id) {
        return done(new Error("token_invalid"), {
            "message": "Invalid token"
        });
    }

    client.get(id, function (err, reply) {
        if (err) {
            return done(err, {
                "message": err
            })
        }

        if (!reply) {
            return done(new Error("token invalid"), {
                "message": "Token doesn't exists, are you sure it hasn't expired or been revoked?"
            });
        } else {
            var data = JSON.parse(reply);
            if (data.token === id) {
                return done(null, data);
            } else {
                return res.status(401).json({
                    "error": "token doesn't exist",
                    "error_description": "Token doesn't exists, login into the system so it can generate new token."
                });
            }
        }
    })
};

module.exports.verify = function (req, res, next) {
    var token = exports.fetch(req.headers);
    console.log(token);
    jsonwebtoken.verify(token, config.secret, function (err, decode) {
        if (err) {
            req.user = undefined;
            return res.status(401).json({
                "error": "access_denied",
                "error_description": "Invalid token."
            });
        }
        exports.retrieve(token, function (err, data) {
            if (err) {
                req.user = undefined;
                return res.status(401).json({
                    "error": "access_denied",
                    "error_description": "Invalid token."
                });
            }
            req.user = data;
            console.log(req.user);
            next();
        })
    })
};

module.exports.expire = function (headers) {
    var token = exports.fetch(headers);
    if (token !== null) {
        client.expire(token, 0);
    }
    return token !== null;
};

module.exports.middleware = function () {
    var func = function (req, res, next) {
        var token = exports.fetch(req.headers);
        exports.retrieve(token, function (err, data) {
            if (err) {
                req.user = undefined;
                return res.status(401).json({
                    "error": "access_denied",
                    "error_description": "The resource owner or authorization server denied the request."
                });
            } else {
                req.user = _.merge(req.user, data);
                next();
            }
        });
    };

    func.unless = require("express-unless");
    return func;
};

module.exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
module.exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;
