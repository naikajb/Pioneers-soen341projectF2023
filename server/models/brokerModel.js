const mongoose = require('mongoose');

const brokerSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
});

const Broker = mongoose.model('Broker', brokerSchema);

module.exports = Broker;
