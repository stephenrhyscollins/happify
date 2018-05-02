const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name : String,
  description : String,
  data : Object,
  view : String
});

const Exercise = mongoose.model('exercise', exerciseSchema);

module.exports = Exercise;
