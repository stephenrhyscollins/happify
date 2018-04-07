const router =  require('express').Router();
var fs = require('fs');

router.get('/track', (req, res) => {
  res.render('partial/track', {user : req.user});
});

router.get('/plan', (req, res) => {
  res.render('partial/plan', {user : req.user});
});

router.get('/progress', (req, res) => {
  res.render('partial/progress', {user : req.user});
});

router.get('/settings', (req, res) => {
  res.render('partial/settings', {user : req.user});
});

module.exports = router;
