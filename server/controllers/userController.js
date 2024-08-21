const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRETE_KEY = process.env.DATABASE_URL;

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

    // Validate that all fields are present
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRETE_KEY, {
      expiresIn: "1hr",
    });
    return res
      .status(201)
      .json({ status: true, message: "Login Successful ...", token: token });
  } catch (error) {
    // Log and respond with an error message
    console.error("Error in /login route:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid token.." });
    }

    jwt.verify(token, SECRETE_KEY, async (err, decode) => {
      const user = await User.findById(decode?.id);
      if(!user){
        return res
        .status(400)
        .json({ status: false, message: "Access Denied.." });
      }
      const userData = { id: user?.id, name: user?.name, email: user?.email };
      return res
        .status(201)
        .json({ status: true, message: "Profile Data", data: userData });
    });
  } catch (error) {
    // Log and respond with an error message
    console.error("Error in /login route:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
