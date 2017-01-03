var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/postgres/').User;
var UserProfile = require('../models/mongo/user-profile.model');
var config = require('../config');

const localLogin = function (req, res) {
    passport.authenticate('local', function(err, user, info){
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};
passport.use(new LocalStrategy({},
    function(username, password, done) {
        User.find({ where: { username: username } })
            .then(function(user) {
                if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
                if (user.verifyPassword(password)){
                    // Success
                    return done(null, user);
                } else {
                    // Password did not match
                    return done(null, false, { message: 'Incorrect password.' });
                }
            }).catch(function(err) {
                console.log(err);
                done(err);
            });
    }
));

const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    console.log(jwtOptions);
    console.log(payload);
    console.log('received');
    UserProfile.findById(payload.id)
        .then(function(user){
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }).catch(function(err){
            if (err) { console.log(payload); return done(err, false); }
        });
});


passport.use(jwtLogin);
passport.use(localLogin);

exports.isAuthenticated = passport.authenticate('local');