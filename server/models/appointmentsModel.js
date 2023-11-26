const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        "property": ObjectId,
        "date": Date,
        "time": String,
        //"broker": ObjectId,
        //"_id": ObjectId,
        "FirstName": String,
        "LastName": String,
        "email": String
    }
);

module.exports = mongoose.model('appointments', appointmentSchema);