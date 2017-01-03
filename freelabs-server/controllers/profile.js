var UserProfile = require('../models/mongo/user-profile.model');

exports.getProfile = function (req, res) {
    var userID = req.params.id;
    UserProfile.findOne({ userID: userID })
        .then(function (userProfile) {
            if (userProfile) {
                return res.status(200).json({
                    success: true,
                    profile: userProfile
                });
            } else {
                return res.status(200).json({
                    error: 'User not found',
                    message: "User doesn't exist"
                });
            }
        }).catch(function(err) {
            return res.status(500).json({
                error: err,
                message: err.message,
                error_description: "Lab was created"
            });
        });

};