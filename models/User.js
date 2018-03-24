const mongoose = require('mongoose');
// take the schema property from Mongoose
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
  // facebookId: String
});

mongoose.model('users', userSchema);
