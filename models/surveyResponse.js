const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveyResponseSchema = new Schema({
  surveyId : String,
  userId : String,
  responses : Object,
  date: { type: Date, default: Date.now }
});

const SurveyResponse = mongoose.model('surveyResponse', surveyResponseSchema);
module.exports = SurveyResponse;
