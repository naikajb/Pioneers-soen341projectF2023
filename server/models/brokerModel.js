const mongoose = require("mongoose");

const brokerSchema = new mongoose.Schema(
    {
        "name": String,
        "email": String,
        "phone": String,
        "company": String,
        "_id": ObjectId
    }
);