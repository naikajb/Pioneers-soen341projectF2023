const mongoose = require('mongoose'); // If you are using Mongoose for Node.js

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true }
//   favoriteProperties: [
//     {
//       $ref: { type: String, required: true, enum: ['properties'] }, // Referencing property in the collection 'properties'
//       $id: { type: mongoose.Schema.Types.ObjectId, required: true }, 
//     },
//   ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
