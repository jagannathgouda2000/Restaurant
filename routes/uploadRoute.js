const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const uploadController = require("../controllers/uploadController");

router.use(verifyJWT);

router.post("/hotel", uploadController.uploadHotelImage);
router.post("/item", uploadController.uploadItemImage);
router.post("/additionalItem", uploadController.uploadItemAdditionalImage);

module.exports = router;
