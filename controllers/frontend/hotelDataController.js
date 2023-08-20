const Hotels = require("../../models/Hotel");
const User = require("../../models/User");

const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotels.find().exec();
    return res.json(hotels);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getHotelByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const hotel = await Hotels.findOne({ name: name }).exec();
    if (!hotel) {
      return res.status(400).json({ message: "Not found" });
    }
    const user = await User.findById(hotel.userId).exec();
    if (!user || !user.isActive)
      return res.status(400).json({ message: "Not found" });
    return res.json(hotel);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getHotelByName,
  getAllHotels,
};
