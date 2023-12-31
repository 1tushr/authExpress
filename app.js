const express = require("express");
const mongoose = require("mongoose");
const dotenv =require('dotenv');
dotenv.config({ path: './config.env' });
const authController = require("./controllers/authController");

const URI = process.env.MONGO_URI;
const PORT = 3000;
const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => {
    console.error("Error connecting to the database:", e);
  });

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the signup route as a POST request
app.post("/signup", authController.signup);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
