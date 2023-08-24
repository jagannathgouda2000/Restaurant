const express = require("express");
const router = express.Router();
const itemDataController = require("../../controllers/frontend/itemDataController");
const verifyJWT = require("../../middlewares/verifyJWT");

router.use(verifyJWT);
router.get("/:hotelId", itemDataController.getItemByHotelId);
