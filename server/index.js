const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require('./routes/userRoutes'); // Import user routes

// Check if the environment variables are set
const dbUrl = process.env.DATABASE_URL || "your-default-mongodb-url";
const port = process.env.PORT || 3000; // Fallback to 3000 if PORT is undefined

// Initialize the Express application
const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors({ origin: true, credentials: true })); // Enable CORS

// Simple health check route
app.get("/", (req, res) => {
  res.send("Server is running ...");
});

// Mount user routes
app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose
  .connect(dbUrl)
  .then(() => console.log("Database connected successfully ..."))
  .catch((err) => {
    console.error("Failed to connect to the database ...", err);
    process.exit(1); // Exit if the database connection fails
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
