const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        "price": Number,
        "property": ObjectId,
        //"broker": ObjectId,
        //"_id": ObjectId,
        "FirstName": String,
        "LastName": String,
        "email": String,
        "status": String,
    }
);

module.exports = mongoose.model('Offer', offerSchema);