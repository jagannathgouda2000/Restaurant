const Item = require("../models/Item");

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const item = await Item.findById(id).exec();
    if (!item || item.isDeleted) {
      return res.status(400).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const addItem = async (req, res) => {
  try {
    const { id } = req.userInfo;
    const { hotelId, name, price, addditionalImage, description, image } =
      req.body;
    if (!name || !hotelId || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ItemObj = {
      userId: id,
      hoteiId: hotelId,
      name: name,
      price: price,
      addditionalImage: addditionalImage,
      description: description,
      image: image,
    };
    const item = await Item.create(ItemObj);
    if (item) res.status(201).json({ message: `New Item ${name} created` });
    else res.status(400).json({ message: "Invalid data found" });
  } catch (ex) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, hotelId, name, price, addditionalImage, description, image } =
      req.body;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const item = await Item.findById(id).exec();

    if (!item) {
      return res.status(400).json({ message: "item not found" });
    }

    name ? (item.name = name) : (item.name = item.name);
    hotelId ? (item.hotelId = hotelId) : (item.hotelId = item.hotelId);
    price ? (item.price = price) : (item.price = item.price);
    addditionalImage
      ? (item.addditionalImage = addditionalImage)
      : (item.addditionalImage = item.addditionalImage);
    description
      ? (item.description = description)
      : (item.description = item.description);
    image ? (item.image = image) : (item.image = item.image);

    const newItem = await item.save();
    res.status(201).json({ message: `Item ${name} updated successfully` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.json(400).json({ message: "id is required" });

    const item = await Item.findById(id).exec();

    if (!item) return res.json(400).json({ message: "item not found" });

    item.isDeleted = true;
    await item.save();
    res.status(200).json({ message: `Deleted successfully` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
