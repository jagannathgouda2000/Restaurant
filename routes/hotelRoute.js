const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyOwner = require("../middlewares/verifyOwner");

router.use(verifyJWT);
router.use(verifyOwner);
router.get("/:id", hotelController.getHotelById);
router.post("/", hotelController.addHotel);
router.patch("/", hotelController.updateHotel);
router.delete("/", hotelController.deleteHotel);

module.exports = router;
