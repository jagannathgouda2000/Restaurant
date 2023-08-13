const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    socialMedia: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurants", restaurantSchema);

module.exports = Restaurant;
