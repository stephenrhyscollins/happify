const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name : String,
  exercises: [{
    type: Schema.ObjectId,
    ref:'exercise;'
  }]
});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;
