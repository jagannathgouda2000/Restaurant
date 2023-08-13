const User = require("../models/User");
const Hotels = require("../models/Hotel");

const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    var hotel = await Hotels.findById(id).exec();
    if (!hotel || hotel.isDeleted) {
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
    const { id } = req.userInfo;
    const { name, state, district, pincode, address, image, socialMedia } =
      req.body;
    if (!name || !state || !district || !pincode || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const duplicate = await Hotels.findOne({ userId: id }).exec();
    if (duplicate && !duplicate.isDeleted) {
      return res
        .status(400)
        .json({ message: "One user can have maximum of 1 hotel" });
    }
    const hotelObj = {
      userId: id,
      name: name,
      state: state,
      district: district,
      pincode: pincode,
      image: image,
      socialMedia: socialMedia,
    };
    const hotel = await Hotels.create(hotelObj);
    if (store) res.status(201).json({ message: `New hotel ${name} created` });
    else res.status(400).json({ message: "Invalid data found" });
  } catch (ex) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateHotel = async (req, res) => {
  try {
    const { id, name, state, district, pincode, address, image, socialMedia } =
      req.body;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const hotel = await Hotels.findById(id).exec();

    if (!hotel) {
      return res.status(400).json({ message: "hotel not found" });
    }

    name ? (hotel.name = name) : (hotel.name = hotel.name);
    state ? (hotel.state = state) : (hotel.state = hotel.state);
    district ? (hotel.district = district) : (hotel.district = hotel.district);
    pincode ? (hotel.pincode = pincode) : (hotel.pincode = hotel.pincode);
    address ? (hotel.address = address) : (hotel.address = hotel.address);
    image ? (hotel.image = image) : (hotel.image = hotel.image);
    socialMedia
      ? (hotel.socialMedia = socialMedia)
      : (hotel.socialMedia = hotel.socialMedia);

    const newHotel = await hotel.save();
    res.status(201).json({ message: `hotel ${name} updated successfully` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.json(400).json({ message: "id is required" });

    const hotel = await Hotels.findById(id).exec();

    if (!hotel) return res.json(400).json({ message: "Hotel not found" });

    hotel.isDeleted = true;
    await hotel.save();
    res.status(200).json({ message: `Deleted successfully` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getHotelById,
  addHotel,
  updateHotel,
  deleteHotel,
};
