const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  exercise : {
    type: Schema.ObjectId,
    ref: 'exercise'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'user'
  },
  dateStarted: {
    type: Date,
    default: Date.now
  },
  data: Object
});

const Session = mongoose.model('session', sessionSchema);

module.exports = Session;
