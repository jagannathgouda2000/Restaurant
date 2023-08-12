const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);
router.get("/:id", hotelController.getHotelById);
router.post("/", hotelController.addHotel);

module.exports = router;
