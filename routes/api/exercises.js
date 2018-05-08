const router =  require('express').Router();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Course = require('../../models/course');
const Session = require('../../models/session');
const Exercise = require('../../models/exercise');
const User = require('../../models/user');
const SurveyResponse = require('../../models/surveyResponse');
router.use(bodyParser.json({extended : true}));
mongoose.Promise = Promise;
  var result;

function returnSessionList(req, res, render){
  Session.
    find({user : req.user}).
    populate({
      path : 'exercise',
      match : {'name' : req.params.exercise}
    }).
    sort('dateStarted').
    exec(function(e,list){
      if(render){
        res.render("partial/exercises", {sessions : list});
      }else{
        res.send(list);
      }
    });
}

router.get('/:exercise', (req, res) => {
  returnSessionList(req, res);
});

router.get('/:exercise/render', (req, res) => {
  returnSessionList(req, res, true);
});



module.exports = router;
