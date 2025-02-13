const express = require("express");
const { register, login, updateUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Route to update user info by username
router.put("/users/:username", updateUser);

module.exports = router;
