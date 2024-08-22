const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRETE_KEY = process.env.SECRETE_KEY;

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate that all fields are present
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create and save the new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Respond with success after user registration
    return res
      .status(201)
      .json({ status: true, message: "Registered successfully" });
  } catch (error) {
    // Log and respond with an error message
    console.error("Error in /register route:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Email not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, SECRETE_KEY, { expiresIn: '1h' })

    // If login is successful
    return res
      .status(200)
      .json({ status: true, message: "Login successful", token });

  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ status: false, message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRETE_KEY);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      const userData = { id: user.id, name: user.name, email: user.email };
      return res
        .status(200)
        .json({ status: true, message: "Profile data retrieved successfully", data: userData });
    } catch (err) {
      // Token verification failed
      return res
        .status(403)
        .json({ status: false, message: "Invalid token" });
    }
  } catch (error) {
    console.error("Error in /profile route:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
