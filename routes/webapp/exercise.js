const router =  require('express').Router();
const request = require('request');
var bodyParser = require('body-parser');
router.use(bodyParser.json({extended : true}));

router.get('/:sessionId/render', (req, res) =>{
  console.log(req.params.sessionId);
  Session.
    findOne({
      _id : req.params.sessionId
    }).
    populate('user').
    populate('exercise').
    exec(function(err, session){
      if(err || (session.user.id != req.user.id)){}
      res.render("partial/"+session.exercise.view, {session : session, exercise : session.exercise, user : req.user});
    });
});
