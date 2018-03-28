const mongoose = require('mongoose');
// take the schema property from Mongoose
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  // facebookId: String
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
