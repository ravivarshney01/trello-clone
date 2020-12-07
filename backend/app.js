const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

require("dotenv").config();

// Database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log("DATABASE CONNECTED");
    },
    () => {
      console.log("Something went wrong with database connection");
    }
  );

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
