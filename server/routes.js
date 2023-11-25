const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Property = require('./models/propertiesModel');
const User = require('./models/usersModel');
const Broker = require('./models/brokerModel');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const cors = require('cors');
const JWT_KEY = "pioneers_341";

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

    //Check if password provided is valid (should be at least 6 characters long)
     if(req.body.password.length < 6) {
      return res.json({ status: 'error', error: 'Password must be at least 6 characters' });
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
    bcrypt.compare(req.body.password, user.password, async (err, isMatch) => {
      if (err || !isMatch) {
        return res.json({ status: 'error', user: false, error: "Incorrect email or password" });
      }

      // sign a web token (cookie) to the user so you can track them throughout the web app
      const token = jwt.sign({
        email: user.email,
        id: user._id,
        name: user.name,
        type: user.userType
      }, 
      JWT_KEY, {}, (err, token) => {
        if (err) {
          console.error("Error signing JWT:", err);
          return res.status(500).json({ status: 'error', error: 'Internal server error' });
        }
        res.cookie('token', token).json({ status: 'ok', user, token }); // Include 'status' field in the response
      });
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
});



// Define an endpoint to fetch brokers (naika)
router.get("/brokers", async (req, res) => {
  const brokers = await Broker.find().exec();
  console.log("Fetched data from MongoDB:", brokers);
  res.json(brokers);
});

// Define an endpoint that gets the profile of the current logged in user
router.get("/Profile", async(req, res) => {
  const {token} = req.cookies
  if(token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if(err) throw err;
      res.json(user)
    })
  } else {
    res.json(null)
  }

});

// Define an endpoint to logout a user
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ status: "ok" });
});



// Define an endpoint to add a property to favorites
router.post("/addFavorite", async (req, res) => {
  const { userId, propertyId } = req.body;

  try {
    // Check if the property is already in favorites
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    if (user.favoriteProps.includes(propertyId)) {
      return res.json({ status: 'ok', message: 'Property already in favorites' });
    }

    // Add the property to favorites
    user.favoriteProps.push(propertyId);
    await user.save();

    res.json({ status: 'ok', message: 'Property added to favorites' });
  } catch (error) {
    console.error("Error adding property to favorites:", error);
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
});

// Define an endpoint to remove a property from favorites
router.post("/removeFavorite", async (req, res) => {
  const { userId, propertyId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    // Remove the property from favorites
    user.favoriteProps = user.favoriteProps.filter((prop) => prop.toString() !== propertyId);
    await user.save();

    res.json({ status: 'ok', message: 'Property removed from favorites' });
  } catch (error) {
    console.error("Error removing property from favorites:", error);
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
});


router.get("/favorites/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    res.json({ status: 'ok', favoriteProps: user.favoriteProps });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
});



module.exports = router;








