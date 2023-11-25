
// const mongoose = require("mongoose");

// const brokerSchema = new mongoose.Schema(
//     {
//         "name": String,
//         "email": String,
//         "phone": String,
//         "company": String,
//         "_id": ObjectId
//     }
// );

const mongoose = require('mongoose');

const brokerSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  activeListings: Number,
});

const Broker = mongoose.model('Broker', brokerSchema);

module.exports = Broker;

