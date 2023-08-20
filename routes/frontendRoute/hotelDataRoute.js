const express = require("express");
const router = express.Router();
const controller = require("../../controllers/frontend/hotelDataController");
const verifyJWT = require("../../middlewares/verifyJWT");

router.use(verifyJWT);

router.get("/", controller.getAllHotels);
router.get("/:name", controller.getHotelByName);

module.exports = router;
