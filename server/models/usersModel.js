const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
  //   favoriteProperties: [
  //     {
  //       $ref: { type: String, required: true, enum: ['properties'] }, // Referencing property in the collection 'properties'
  //       $id: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  //     },
  //   ],
});

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





//prevent duplicate user
// userSchema.static.isThisEmailInUse = async function (email) {
//   if(!email) throw new Error('Invalid email');
//   try {
//     const user = await this.findOne({ email })
//     if (user) return false
//     return true;
//   } catch (error) {
//     console.log('error inside isthisemailUSer', error.message)
//     return false
//   }
// }

const User = mongoose.model('User', userSchema);

module.exports = User;
