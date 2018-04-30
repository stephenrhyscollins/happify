const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  title : String,
  description : String,
  questions : Object,
  responses : Object
});

const Survey = mongoose.model('survey', surveySchema);
module.exports = Survey;
