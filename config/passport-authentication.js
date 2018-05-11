const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const exercise = require('../routes/api/exercise');
const Session = require('../models/session')
const User = require('../models/user');
const cookieSession = require('cookie-session');
var credentials;



if(!process.env.MODE){
  credentials = require('../config/credentials.js');
}else{
  credentials = {
    MONGODB : {
      dbURI :"mongodb://webserver:" +  process.env.MONGODB_URI + ".mlab.com:29939/happify"
    },
    GOOGLE : {
      clientID: (process.env.GOOGLE_CLIENTID + ".apps.googleusercontent.com"),
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL : process.env.GOOGLE_CALLBACKURI || '/api/auth/google/redirect'
    }
  }
}
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use(
  new GoogleStrategy(
    credentials.GOOGLE,(accessToken, refreshToken, profile, done) => googleCallback(accessToken, refreshToken, profile, done)
  )
);
//Google login cal l callback

function googleCallback(accessToken, refreshToken, profile, done){
   User.findOne({googleId : profile.id}).then((user) => {
     if(!user){
       user = createUser(profile).then((user) => {
         createSessions(user);
         done(null,user);
       });
     }else{done(null, user)};
   });
 };

 //modify these methods to check for Facebook or

var createUser = function(profile){
  return new Promise(function(resolve, reject){
    new User({
      email : profile.emails[0].value,
      googleId : profile.id,
      name : profile.name,
      gender : profile.gender,
      profileImage : profile._json.image.url
    }).save().then((user) => {
        resolve(user);
    });
  });
}

var createSessions = function(user){
  var exercises = ["Activity Tracking", "Activity Planning", "Journal"]
  exercises.forEach(function(item){
    exercise.getExercise(null, item, function(err, exercise){
      if(!err){
        new Session({
          user: user,
          exercise : exercise
        }).save();
      }
    });
  });
}




/*passport.use(new FacebookStrategy(
  credentials.FACEBOOK,
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
*/
