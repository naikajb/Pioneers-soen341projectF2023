const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();
const Property = require('./models/propertiesModel');
const User = require('./models/usersModel');
const Broker = require('./models/brokerModel');
//const asyncHandler = require('express-async-handler')

// Define an endpoint to fetch brokers
router.get("/brokers", async (req, res) => {
  try {
    const brokers = await Broker.find();
    res.json(brokers);
  } catch (error) {
    console.error("Error fetching brokers:", error);
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
});

// Define an endpoint to add a new broker
router.post("/brokers", async (req, res) => {
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
router.put("/brokers/:id", async (req, res) => {
  try {
    const updatedBroker = await Broker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBroker);
  } catch (error) {
    console.error("Error updating broker:", error);
    res.status(400).json({ status: 'error', error: 'Bad request' });
  }
});

// Define an endpoint to delete a broker
router.delete("/brokers/:id", async (req, res) => {
  try {
    await Broker.findByIdAndDelete(req.params.id);
    res.json({ status: 'ok' });
  } catch (error) {
    console.error("Error deleting broker:", error);
    res.status(400).json({ status: 'error', error: 'Bad request' });
  }
});

// Define an endpoint to fetch properties
router.get("/properties", async (req, res) => {
  const properties = await Property.find().exec();
  console.log("Fetched data from MongoDB:", properties);
  res.json(properties);
});

// Define an endpoint to register user
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.json({ status: 'error', error: 'Account already exists' });
    }

    // Check if the provided email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.json({ status: 'error', error: 'Invalid email address' });
    }

    // Check if the user's email exists in the brokers collection
    const brokerWithEmail = await Broker.findOne({ email: req.body.email });

    if (brokerWithEmail) {
      // If the email exists in the brokers collection, register as a broker
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: "broker",
      });

      return res.json({ status: 'ok' });
    }

    // If the email doesn't exist in the brokers collection, register user as a buyer
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userType: "buyer",
    });

    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Account registration failed' });
  }
});

// Define an endpoint to login user
router.post('/login', async (req, res) => {
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

    // assign token to user 
    const token = jwt.sign(
        {
            name: user.name,
            email: user.email,
        },
        'secret123'
    )

      res.json({ status: 'ok', user: token });
    });
  } catch (err) {
    res.json({ status: 'error' });
  }
});

// Define an endpoint to fetch brokers (naika)
router.get("/brokers", async (req, res) => {
  const brokers = await Broker.find().exec();
  console.log("Fetched data from MongoDB:", brokers);
  res.json(brokers);
});

module.exports = router;
