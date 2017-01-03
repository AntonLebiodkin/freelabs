var express = require('express');
var router = express.Router();

var Lab = require('../../../models/mongo/lab.model');

router.put('/', function (req, res, next) {
    var lab = new Lab(req.body);
    lab.save(function (err) {
        if (err) {
            //MONGODB ERROR HANDLER
            res.status(500).send("Error while creating lab");
        }
        return res.json({
            "success": "true",
            "message": "Lab was created"
        });
    })
});