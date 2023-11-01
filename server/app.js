const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb+srv://admin:zhpEohWXSzyKgQMH@cluster0.0l0riwk.mongodb.net/?retryWrites=true&w=majority");

const Property = require('./models/propertiesModel'); 

// async function insert() {
//   await Property.create({  price: "$599,999",
//   address: "1455 Blvd. De Maisonneuve Ouest",
//   bedroom: 3,
//   bathroom: 2,
//   amenities: ['Swimming Pool', 'Garden', 'Garage'],
//   broker: { name: 'John Doe', contact: '123-456-7890' } });

//   await Property.create({ price: "$1,045,657",
//   address: "1455 Blvd. De Maisonneuve Ouest",
//   bedroom: 4,
//   bathroom: 3,
//   amenities: ['Swimming Pool', 'Garden', 'Garage'],
//   broker: { name: 'John Doe', contact: '123-456-7890' } });

//   await Property.create({  price: "$234,567",
//   address: "1455 Blvd. De Maisonneuve Ouest",
//   bedroom: 3,
//   bathroom: 2,
//   amenities: ['Swimming Pool', 'Garden', 'Garage'],
//   broker: { name: 'John Doe', contact: '123-456-7890' } });

//   await Property.create({  price: "$780,500",
//   address: "1455 Blvd. De Maisonneuve Ouest",
//   bedroom: 4,
//   bathroom: 3,
//   amenities: ['Swimming Pool', 'Garden', 'Garage'],
//   broker: { name: 'John Doe', contact: '123-456-7890' } });

//   await Property.create({  price: "$450,000",
//   address: "1455 Blvd. De Maisonneuve Ouest",
//   bedroom: 3,
//   bathroom: 2,
//   amenities: ['Swimming Pool', 'Garden', 'Garage'],
//   broker: { name: 'John Doe', contact: '123-456-7890' } });

//   await Property.create({  price: "$970,000",
//   address: "1455 Blvd. De Maisonneuve Ouest",
//   bedroom: 10,
//   bathroom: 2,
//   amenities: ['Swimming Pool', 'Garden', 'Garage'],
//   broker: { name: 'John Doe', contact: '123-456-7890' } });

// }

//insert();

// async function read() {
//   const properties = await Property.find().exec();
//   properties.forEach(property => {
//     console.log(`Price: ${property.price}, Address: ${property.address}`);
//   });
// }

// Define an API endpoint to fetch properties
app.get("/api/properties", async (req, res) => {
  const properties = await Property.find().exec();
  console.log("Fetched data from MongoDB:", properties);
  res.json(properties);
});

//read();


app.listen(5000, () => {
  console.log("Server running on port 5000");
});