const express = require("express");
const router = express.Router();
const User = require('../models/Users');
const{ registerUser ,loginUser ,profile } = require('../controllers/userController')


// Register Route
router.post("/register", registerUser );

//login route
router.post("/login", loginUser);

//profile route
router.post("/profile", profile);

module.exports = router;
