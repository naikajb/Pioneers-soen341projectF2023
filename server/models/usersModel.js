const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
const validUserTypes = ["broker", "buyer", "renter", "superadmin"];

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, enum: validUserTypes },
  favoriteProps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
});

//hash password before it is saved to database
userSchema.pre('save', function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // Hash the password using the new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // Override the plaintext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


const User = mongoose.model('User', userSchema);

module.exports = User;
