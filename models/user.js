const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email : String,
  googleId : String,
  facebookId : String,
  name : Object,
  gender : String,
  profileImage : String,
  exercises : {
    active : Object,
    completed : Object
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
