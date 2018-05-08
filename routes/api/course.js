const router =  require('express').Router();
var fs = require('fs');
var bodyParser = require('body-parser');
const Course = require('../../models/course');
const Enrollment = require('../../models/enrollment');
const Exercise = require('../../models/exercise');
const User = require('../../models/user');
const SurveyResponse = require('../../models/surveyResponse');
router.use(bodyParser.json({extended : true}));




router.get('/start', (req, res) => {
  var dbUser;
  getUser(req.body.userId, function(err, user){
    if(!err){
      dbUser = user;
    }
  });

  var dbCourse;
  getCourse(req.body.courseId, function(err, course){
    if(!err){
      dbCourse = course;
    }


  });

  var enrollment = new Enrollment({
    user : dbUser,
    course : dbCourse
  }).then(function(enrollment){
    console.log(enrollment);
  });
});

function getUser(userId, callback){
  User.findById(userId, function(err, users){
    if(err){
      console.log('error ' + err );
      callback(err, null);
    }else{
      console.log('users: ' + users);
      callback(null, users[0]);
    }
  })
};

function getCourse(courseId, callback){
  Course.findById(courseId, function(err, courses){
    if(err){
      callback(err, null);
    }else{
      callback(null, courses[0]);
    }
  })
};

function getExercise(exerciseId, callback){
  console.log(exerciseId);
  Exercise.findOne({_id:exerciseId}, function(err, exercise){
    if(err){
      console.log('error ' + err );
      callback(err, null);
    }else{
      console.log('users: ' + exercise);
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

router.post('/new', (req, res) => {
  console.log(req.body.exerciseId);
  getExercise(req.body.exerciseId, function(err, exercise){
    var e = new Course({
      name : req.body.title,
      exercises : exercise
    }).save();
  });
});


module.exports = router;
