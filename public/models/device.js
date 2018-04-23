const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  deviceId : String,
  platform : String
});

const Device = mongoose.model('device', deviceSchema);

module.exports = Device;
