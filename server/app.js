const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const routes = require('./routes'); 

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://admin:zhpEohWXSzyKgQMH@cluster0.0l0riwk.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('db connected')).catch((err) => console.log('DB not connected', err))

//Use the routes to handle requests
app.use('/api', routes);

//Port
app.listen(5001, () => {
  console.log("Server running on port 5000");
});