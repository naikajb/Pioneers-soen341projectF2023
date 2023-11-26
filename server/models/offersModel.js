const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        "price": Number,
        "property": String,
        //"broker": ObjectId,
        //"_id": ObjectId,
        "FirstName": String,
        "LastName": String,
        "email": String
    }
);

module.exports = mongoose.model('Offer', offerSchema);