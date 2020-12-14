const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const {
  createBoard,
  getBoardById,
  isMemberOfBoard,
  removeUserFromBoard,
  getBoard,
  addUsersToBoard,
} = require("../controllers/board");
const { isAuthenticated, isLoggedIn } = require("../controllers/auth");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");

// params
router.param("userId", getUserById);
router.param("boardId", getBoardById);

// routes
router.get(
  "/board/:boardId/:userId",
  isLoggedIn,
  isAuthenticated,
  getTasks,
  isMemberOfBoard,
  getBoard
);
router.post("/board/create/:userId", isLoggedIn, isAuthenticated, createBoard);
router.post(
  "/board/:boardId/add/:userId",
  isLoggedIn,
  isAuthenticated,
  isMemberOfBoard,
  addUsersToBoard
);
router.post(
  "/board/:boardId/remove/:userId",
  isLoggedIn,
  isAuthenticated,
  isMemberOfBoard,
  removeUserFromBoard
);

router.post(
  "/board/:boardId/:userId/taskadd",
  isLoggedIn,
  isAuthenticated,
  isMemberOfBoard,
  createTask
);
router.post(
  "/board/:boardId/:userId/updatetask",
  isLoggedIn,
  isAuthenticated,
  isMemberOfBoard,
  updateTask
);

router.delete(
  "/board/:boardId/:userId/deletetask/:taskId",
  isLoggedIn,
  isAuthenticated,
  isMemberOfBoard,
  deleteTask
);

module.exports = router;
