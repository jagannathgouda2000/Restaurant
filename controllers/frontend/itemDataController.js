const Item = require("../../models/Item");

const getItemByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;
    if (!hotelId) {
      return res.status(400).json({ message: "Hotel Id is required" });
    }
    const items = Item.find({
      $and: [{ hotelId: hotelId }, { isActive: true }],
    }).exec();
    if (!items) return res.status(400).json({ message: "no items found" });
    res.json(items);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getItemByHotelId,
};
