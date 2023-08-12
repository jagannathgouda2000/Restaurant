const User = require("../models/User");
const Hotels = require("../models/Hotel");

const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    var hotel = await Hotels.findById(id).exec();
    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const addHotel = async (req, res) => {
  try {
  } catch (ex) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getHotelById,
  addHotel,
};
