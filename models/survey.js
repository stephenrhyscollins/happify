const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  questions : Object,
  responses : Object
});

const Survey = mongoose.model('survey', surveySchema);
module.exports = Survey;
