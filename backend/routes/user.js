const express = require("express");
const router = express.Router();

const { isAuthenticated, isLoggedIn } = require("../controllers/auth");
const {
  getUserById,
  getUserBoards,
  getUserByToken,
  getUsers,
} = require("../controllers/user");

// params
router.param("userId", getUserById);

// routes
router.get("/user", isLoggedIn, getUserByToken);
router.get("/user/boards/:userId", isLoggedIn, isAuthenticated, getUserBoards);
router.get("/user/all/:userId", isLoggedIn, isAuthenticated, getUsers);
module.exports = router;
