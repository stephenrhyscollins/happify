const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
  startDate: {
    type: Date,
    default: Date.nowrap
  },
  user: {
    type: Schema.ObjectId,
    ref: 'user'
  },
  course: {
    type: Schema.ObjectId,
    ref: 'course'
  }
});

const Enrollment = mongoose.model('enrollment', enrollmentSchema);

module.exports = Enrollment;
