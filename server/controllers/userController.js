const User = require('../models/Users');

exports.registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validate that all fields are present
      if (!name || !email || !password) {
        return res.status(400).json({ status: false, message: "All fields are required" });
      }
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ status: false, message: "Email already registered" });
      }
  
      // Create and save the new user
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      // Respond with success after user registration
      return res.status(201).json({ status: true, message: "Registered successfully" });
  
    } catch (error) {
      // Log and respond with an error message
      console.error("Error in /register route:", error);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  }