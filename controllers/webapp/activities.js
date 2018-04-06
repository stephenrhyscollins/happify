const router =  require('express').Router();
var fs = require('fs');

router.get('/track', (req, res) => {
  res.render('partial/calendar', {user : req.user});
});

router.get('/plan', (req, res) => {
  res.render('partial/calendar', {user : req.user});
});

router.get('/progress', (req, res) => {
  res.render('partial/calendar', {user : req.user});
});

router.get('/plan', (req, res) => {
  res.render('partial/calendar', {user : req.user});
});

module.exports = router;
