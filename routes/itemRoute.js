const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);
router.get("/:id", itemController.getItemById);
router.post("/", itemController.addItem);
router.patch("/", itemController.updateItem);
router.delete("/", itemController.deleteItem);

module.exports = router;
