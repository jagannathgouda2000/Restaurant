const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    name: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    District: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      reuired: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurants", restaurantSchema);

module.exports = Restaurant;
