const mongoose = require('mongoose');

// Define a schema for your data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  socketConnect:{

  }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User