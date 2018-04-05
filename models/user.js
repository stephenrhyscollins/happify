const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email : String,
  googleId : String,
  name : Object,
  gender : String,
  profileImage : String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
