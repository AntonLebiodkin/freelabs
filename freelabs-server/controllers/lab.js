var Lab = require('../models/mongo/lab.model');
var UserProfile = require('../models/mongo/user-profile.model');
var redis = require('redis');
var client = redis.createClient();
const NEW = 0;

exports.postLab = function (req, res) {
    var username = req.user.username;
    UserProfile.findOne({ username: username })
               .then(function (userProfile) {
                   var _lab = req.body.lab;
                   _lab.status = NEW;
                   _lab.author = userProfile;
                   _lab.proposals = [];
                   var lab = new Lab(_lab);
                   lab.proposals = [];
                   lab.save();
                   return res.json({
                       success: true,
                       message: "Lab was created"
                   });
               }).catch(function(err) {
                    return res.status(500).json({
                        error: err,
                        message: err.message,
                        error_description: "Lab wasn't created"
                    });
               });

};

exports.getLabsForSubjects = function (req, res) {
    client.get('subjects=' + req.query.subjects, function (error, result) {
        if(result) {
            return res.status(200).json(JSON.parse(result));
        } else {
            var subjectsString = req.query.subjects;
            var subjects = JSON.parse("[" + subjectsString + "]");
            Lab.find({
                subject: {
                    $all: subjects
                }
            }).populate('author')
                .then(function (subjects) {
                    client.setex('subjects=' + req.query.subjects, 120, JSON.stringify(subjects));
                    return res.status(200).json(subjects);
                });
        }
    });
};

exports.getLabsForPage = function (req, res) {
    client.get('page='+req.query.page, function (error, result) {
        if(result) {
            return res.status(200).json(JSON.parse(result));
        } else {
            var page = req.query.page;
            Lab.paginate({}, { page: page, populate: 'author' }).then(function(labs) {
                client.setex('page='+req.query.page, 120, JSON.stringify(labs));
                return res.status(200).json(labs);
            });
        }
    });
};

exports.getLabById = function (req, res) {
    const labId = req.params.id;
    client.get('labID='+ labId, function (error, result) {
        if(result) {
            return res.status(200).json(JSON.parse(result));
        } else {
            Lab.findOne({ id: labId }).populate('author').then(function(lab) {
                client.setex('labID=' + labId, 120, JSON.stringify(lab));
                return res.status(200).json(lab);
            });
        }
    });
};