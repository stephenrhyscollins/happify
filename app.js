const express = require('express');
const app = express();
const passsportSetup = require('./config/passport-authentication');
const dashboardController = require('./controllers/webapp/dashboard');
const activitiesController = require('./controllers/webapp/activities');
const authController = require('./controllers/api/auth');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
var credentials;


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
app.use('/activities', activitiesController);
//Set routing paths
app.use('/auth', authController);
//Use default express middleware to handle retrieving static files
app.use('/assets', express.static('assets'));


app.set('view engine', 'ejs');


app.get('/', (req, res, next) => {
  res.render('landing');
});


//initialise passport

//connect to MONGODB
mongoose.connect(credentials.MONGODB.dbURI, function(){
  console.log("connected");
}).catch(function(e){
  console.log(e);
});

module.exports = app;
