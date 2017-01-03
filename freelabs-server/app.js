var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var Sequelize = require('sequelize');
var passport = require('passport');
var session = require('express-session');
var unless = require('express-unless');
var config = require('./config');
var responseTime = require('response-time');

var jwt    = require('express-jwt');
var jwtCheck = jwt({
  secret: config.secret
});
jwtCheck.unless = unless;


var setup = require('./routes/API/setup');

var authController = require('./controllers/auth');
var tokenController = require('./controllers/token');
var registerController = require('./controllers/register');
var labController = require('./controllers/lab');
var profileController = require('./controllers/profile');
var utils = require('./utils');
var generate = require('./scripts/lab_generating');

var mongoose = require('mongoose');
mongoose.connect(config.database);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', config.secret);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(responseTime());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var router = express.Router();

router.route('/auth/token')
      .post(tokenController.authenticate);
router.route('/auth/register')
      .post(registerController.registration);
router.route('/setup')
      .get(setup);
router.route('/labs')
      .post(utils.verify, labController.postLab)
      .get(labController.getLabsForPage);
router.route('/labs/for-subjects')
      .get(labController.getLabsForSubjects);
router.route('/profile/:id')
      .get(utils.verify, profileController.getProfile);
router.route('/generate')
       .get(generate);

app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
