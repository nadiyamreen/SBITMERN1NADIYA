const express = require("express");
const router = express.Router();
const { register, login, testToken, logout } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/test", testToken);

module.exports = router;