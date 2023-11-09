const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:zhpEohWXSzyKgQMH@cluster0.0l0riwk.mongodb.net/?retryWrites=true&w=majority");

//database models
const Property = require('./models/propertiesModel');
const User = require('./models/usersModel');
<<<<<<< HEAD
const Broker = require('./models/brokersModel');
=======
const Broker = require('./models/brokerModel');
//Amans Brokerlist
// Define an endpoint to fetch brokers
app.get("/api/brokers", async (req, res) => {
  try {
    const brokers = await Broker.find();
    res.json(brokers);
  } catch (error) {
    console.error("Error fetching brokers:", error);
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
});

// Define an endpoint to add a new broker
app.post("/api/brokers", async (req, res) => {
  try {
    const newBroker = new Broker(req.body);
    const savedBroker = await newBroker.save();
    res.status(201).json(savedBroker);
  } catch (error) {
    console.error("Error adding new broker:", error);
    res.status(400).json({ status: 'error', error: 'Bad request' });
  }
});

// Define an endpoint to update an existing broker
app.put("/api/brokers/:id", async (req, res) => {
  try {
    const updatedBroker = await Broker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBroker);
  } catch (error) {
    console.error("Error updating broker:", error);
    res.status(400).json({ status: 'error', error: 'Bad request' });
  }
});

// Define an endpoint to delete a broker
app.delete("/api/brokers/:id", async (req, res) => {
  try {
    await Broker.findByIdAndDelete(req.params.id);
    res.json({ status: 'ok' });
  } catch (error) {
    console.error("Error deleting broker:", error);
    res.status(400).json({ status: 'error', error: 'Bad request' });
  }
});
//Amans end point
>>>>>>> AmanLatest

//Define an endpoint to fetch properties
app.get("/api/properties", async (req, res) => {
  const properties = await Property.find().exec();
  console.log("Fetched data from MongoDB:", properties);
  res.json(properties);
});

// Define an endpoint to register user
app.post("/api/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.json({ status: 'error', error: 'Account already exists' });
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Account registration failed' });
  }
});


//Define an endpoint to login user
app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({ status: 'error', user: false, error: "Account doesn't exist" });
    }

    // Compare the provided plain text password with the hashed password in the database
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.json({ status: 'error', user: false, error: "Incorrect password" });
      }

      res.json({ status: 'ok', user: true });
    });
  } catch (err) {
    res.json({ status: 'error' });
  }
});

//Define an endpoint to fetch brokers
app.get("/api/brokers", async (req, res) => {
  const brokers = await Broker.find().exec();
  console.log("Fetched data from MongoDB:", brokers);
  res.json(brokers);
});

//port
app.listen(5001, () => {
  console.log("Server running on port 5000");
});