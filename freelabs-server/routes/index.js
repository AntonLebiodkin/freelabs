var express = require('express');
var router = express.Router();

var token = require('./API/auth/token');
var register = require('./API/auth/register');

router.post('/token', token);
router.post('/register', register);
module.exports = router;
