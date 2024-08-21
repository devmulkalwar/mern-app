const express = require("express");
const router = express.Router();
const User = require('../models/Users');
const{ registerUser} = require('../controllers/userController')

// Register Route
router.post("/register", registerUser );

module.exports = router;
