const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
FacebookStrategy = require('passport-facebook');
const credentials = require('./credentials.js');
const User = require('../models/user');
const cookieSession = require('cookie-session');


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
