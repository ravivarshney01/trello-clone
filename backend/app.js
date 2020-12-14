const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const boardRoutes = require("./routes/board");

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Environment Variables
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

// endpoints
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", boardRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
