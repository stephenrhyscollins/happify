const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  endpoint : String,
  keys : Object
});

const Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = Subscription;
