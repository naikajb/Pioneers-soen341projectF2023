const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        "price": Number,
        "property": ObjectId,
        "broker": ObjectId,
        "_id": ObjectId
    }
);

module.exports = mongoose.model('Offer', offerSchema);