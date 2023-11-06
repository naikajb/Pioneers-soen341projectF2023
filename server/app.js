const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:zhpEohWXSzyKgQMH@cluster0.0l0riwk.mongodb.net/?retryWrites=true&w=majority");

//database models
const Property = require('./models/propertiesModel');
const User = require('./models/usersModel');

//Define an endpoint to fetch properties
app.get("/api/properties", async (req, res) => {
  const properties = await Property.find().exec();
  console.log("Fetched data from MongoDB:", properties);
  res.json(properties);
});

//Define an endpoint to register user
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Account already exists' });
  }

})

//Define an endpoint to login user
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })

    if (user) {
      return res.json({ status: 'ok', user: true })
    } else {
      return res.json({ status: 'error', user: false })
    }


    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error' });
  }

})

//port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});