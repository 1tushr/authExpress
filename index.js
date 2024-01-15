const express = require("express");
const app = express();
const mongoose = require('mongoose');
const userRoute = require("./src/routes/v1/user");
const rateLimit = require('express-rate-limit')
const dotenv = require('dotenv');



// Load environment variables
dotenv.config();

// MongoDB connection setup
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    // Start the server only if MongoDB connection is successful
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
    // exit the application if MongoDB connection fails
    process.exit(1);
  });

 const limiter  = rateLimit({
  windowMs : 1*60*1000, // 1 minute
  max: 2
})

app.use(express.json());

app.use(limiter)
//  routes
app.use("/user", userRoute);


