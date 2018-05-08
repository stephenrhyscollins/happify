const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const passsportSetup = require('./config/passport-authentication');
const dashboardController = require('./routes/webapp/dashboard');
const activitiesController = require('./routes/webapp/activities');
const courseController = require('./routes/api/course');
const exerciseController = require('./routes/api/exercise');
const exercisesController = require('./routes/api/exercises');
const notifyController = require('./routes/webapp/notify');
const authController = require('./routes/api/auth');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
var webPush = require("web-push");
var atob = require('atob');
var bodyParser = require('body-parser');
var util = require('util');
var credentials;
const Subscription = require("./models/subscription");
var AUTH_SECRET="hello";
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

if(!process.env.MODE){
  credentials = require('./config/credentials');
}else{
  credentials = {
    COOKIE : {key: [process.env.COOKIE_KEY]},
    MONGODB : {
      dbURI :"mongodb://webserver:" +  process.env.MONGODB_URI + ".mlab.com:29939/happify"
    }
  }
}
app.use(cookieSession({
  //1 day in ms
  maxAge: 24 * 60 * 60 * 1000,
  keys: credentials.COOKIE.key
}));

app.use(passport.initialize());
app.use(passport.session());
//Set routing paths
app.use('/dashboard', dashboardController);
app.use('/api/activities', activitiesController);
app.use('/api/course', courseController);
app.use('/api/exercise', exerciseController);
app.use('/api/exercises', exercisesController);
//Set routing paths
app.use('/notify', notifyController);
//Set routing paths
app.use('/api/auth', authController);
//Use default express middleware to handle retrieving static files
app.use('/assets', express.static('assets'));

app.set('view engine', 'ejs');


app.get('/', (req, res, next) => {
  if(req.user){
    res.redirect('/dashboard');
  }
  res.render('landing');
});
app.get('/sw.js', (req, res, next) => {
  res.sendFile('sw.js' , { root : __dirname});
});

app.post('/subscribe', function(req, res) {
  Subscription.find({endpoint : req.body.notificationEndPoint}).
  then((subscription) => {
    if(!subscription){
      new Subscription ({
          deviceId: req.body.notificationEndPoint,
          p256dh: req.body.publicKey,
          auth: req.body.auth
      }).save();
    }
  }).catch(err =>{});
});



//initialise passport

//connect to MONGODB
mongoose.connect(credentials.MONGODB.dbURI, function(){
  console.log("connected");
}).catch(function(e){
  console.log(e);
});





module.exports = app;
