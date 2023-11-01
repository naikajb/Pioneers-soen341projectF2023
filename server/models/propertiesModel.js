const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    { 
        price: String, 
        address: String,
        bedroom: Number,
        bathroom: Number,
        amenities: [String],
        broker: { 
            name: String, 
            contact: String 
        },
        image: String
    }
);

module.exports = mongoose.model('Property', propertySchema);