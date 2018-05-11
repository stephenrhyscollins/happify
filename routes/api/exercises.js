const router =  require('express').Router();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const Course = require('../../models/course');
const Session = require('../../models/session');
const Exercise = require('../../models/exercise');
const exercise = require ('./exercise');
const User = require('../../models/user');
const SurveyResponse = require('../../models/surveyResponse');
router.use(bodyParser.json({extended : true}));
mongoose.Promise = Promise;
  var result;

function returnSessionList(req, res, render){
  exerciseFound = exercise.getExercise(null, req.params.exercise, function(err, exercise){
    if(!err){exerciseFound = exercise;}
  });
  Session.
    find({user : req.user}).
    populate('exercise').
    sort('dateStarted').
    exec(function(e,list){
      console.log('list '+list);
      newList = list.filter(function(item){if(item.exercise.name !=req.params.exercise){return false;}else{return true;}});
      console.log('new ' + newList);
      if (newList.length > 1){
        if(render){
          res.render("partial/exercises", {sessions : newList, exercise:exerciseFound});
        }else{
          res.send(list);
        }
      }else{
        res.redirect('/api/exercise/'+newList[0]._id + '/render');
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
