const router = require('express').Router();
const passport = require('passport');

var fs = require('fs');

router.get(
  '/google',
  passport.authenticate(
    'google',
    {scope:['email','profile']}
  )
);

router.get(
  '/google/redirect',
  passport.authenticate('google'),
  (req, res, next) => {
    res.redirect('/dashboard/home');
  }
);

router.get('/', (req, res, next) => {
  if(req.user){
    res.redirect('../dashboard')
  }
  res.render('landing');
});

router.get('/signout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
