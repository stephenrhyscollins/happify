const router =  require('express').Router();
var fs = require('fs');
var bodyParser = require('body-parser');
const Survey = require('../../models/survey');
const SurveyResponse = require('../../models/surveyResponse');
router.use(bodyParser.json({extended : true}));

const DEPRESSION_SURVEY = "5ae4be566559681204aa2a2e";


router.post('/addSurvey', (req, res) => {

  var survey = new Survey({
    title : req.body.title,
    description : req.body.description,
    questions : req.body.questions,
    responses : req.body.responses
  }).save();
});

router.post('/survey/submit', (req, res) => {
  var response = new SurveyResponse({
    userId : req.user._id,
    surveyId : req.body.surveyId,
    responses : req.body.responses,
    score : req.body.score
  }).save();
});



module.exports = router;
