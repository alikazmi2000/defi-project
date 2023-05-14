const mongoose = require('mongoose');

const uri = 'mongodb://localhost:5544/amish';

const connect = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

  } catch (err) {
    console.error(err);
  }
};

module.exports = connect;