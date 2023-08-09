const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUri);
  } catch (err) {}
};

module.exports = connectDB;
