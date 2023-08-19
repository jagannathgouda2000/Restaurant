const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/login/user", authController.userLogin);
router.post("/logout", authController.logout);

module.exports = router;
