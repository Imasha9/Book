const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();
dotenv.config();

const PORT=8070;




app.use(cors());
app.use(bodyParser.json());
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
const reviewRoutes = require("./Routes/BookReview.js");
app.use("/BookReview", reviewRoutes);


connection.once("open", () => {
  console.log("MongoDB database connected successfully!");
});

//routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
