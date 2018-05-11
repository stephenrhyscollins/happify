const router =  require('express').Router();
var fs = require('fs');
var bodyParser = require('body-parser');
const Course = require('../../models/course');
const Session = require('../../models/session');
const Exercise = require('../../models/exercise');
const User = require('../../models/user');
const SurveyResponse = require('../../models/surveyResponse');
router.use(bodyParser.json({extended : true}));

router.post('/', (req, res) => {
  console.log(req.body);
  var e = new Exercise({
    name : req.body.title,
    description : req.body.description,
    data : req.body.data,
    view : req.body.view
  }).save();
});


router.post('/start', (req, res) => {
  console.log(req.user);
  getExercise(req.body.exerciseId, null, function(err, exercise){
    if(err){res.sendStatus(404);}
    new Session({
      user: req.user,
      exercise : exercise,
      data: req.body.data
    }).save();
  });
});




function getUser(userId, callback){
  User.findById(userId, function(err, users){
    if(err){
      console.log('error ' + err );
      callback(err, null);
    }else{
      callback(null, users[0]);
    }
  })
};

router.get('/:sessionId/render', (req, res) =>{
  console.log(req.user);
  Session.
    findOne({
      _id : req.params.sessionId
    }).
    populate('user').
    populate('exercise').
    exec(function(err, session){
      console.log(req.user.id);
      if((!session) || err || (session.user.id != req.user.id)){
        res.sendStatus(404);
      }else{
        res.render(session.exercise.view, {session : session, exercise : session.exercise, user : req.user});
      }
    });
});

router.get('/:sessionId', (req, res) =>{
  console.log(req.params.sessionId);
  Session.
    findOne({
      _id : req.params.sessionId
    }).
    populate('user').
    populate('exercise').
    exec(function(err, session){

      if(err || (session.user.id != req.user.id)){
        res.redirect("/");
      }
      res.send({session : session, exercise : session.exercise, user : req.user});
    });
});



function getCourse(courseId, callback){
  Course.findById(courseId, function(err, courses){
    if(err){
      callback(err, null);
    }else{
      callback(null, courses[0]);
    }
  })
};



router.post('/', (req, res) => {

  var survey = new Survey({
    title : req.body.title,
    description : req.body.description,
    questions : req.body.questions,
    responses : req.body.responses
  }).save();
});


router.post('/new', (req, res) => {
  console.log(req.body.title);
    console.log(req.body.description);
      console.log(req.body.view);
        console.log(req.body.data);
  var e = new Exercise({
    name : req.body.title,
    description : req.body.description,
    data : req.body.data
  }).save();
});

router.post('/addCourse', (req, res) => {
  console.log(req.body.exerciseId);
  getExercise(req.body.exerciseId, null, function(err, exercises){
    var e = new Course({
      name : req.body.title,
      exercises : exercises
    }).save();
  });
});


function getExercise(exerciseId, exerciseName, callback){
  console.log(exerciseId);
  var query;
  if(exerciseId){
    query = {_id:exerciseId};
  }
  if(exerciseName){
    console.log("here");
    query = {name:exerciseName};
  }
  console.log("query " + query.name);
  Exercise.findOne(query, function(err, exercise){
    if(err){
      console.log('error ' + err );
      callback(err, null);
    }else{
      console.log('exercise: ' + exercise);
      callback(null, exercise);
    }
  })
};

router.post('/addSurvey', (req, res) => {

  var survey = new Survey({
    title : req.body.title,
    description : req.body.description,
    questions : req.body.questions,
    responses : req.body.responses
  }).save();
});




module.exports = {router: router, getExercise : getExercise};
