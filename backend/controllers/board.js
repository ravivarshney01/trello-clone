const Board = require("../models/board");

exports.getBoardById = (req, res, next, id) => {
  Board.findById(id).exec((err, board) => {
    if (err) {
      return res.status(400).json({
        error: "Board Not Found",
      });
    }
    req.board = board;
    next();
  });
};

exports.getBoard = (req, res) => {
  res.json({
    tasks: req.tasks,
    ...req.board._doc,
  });
};

exports.createBoard = (req, res) => {
  let board = new Board(req.body);
  board.members = [{ _id: req.profile._id, name: req.profile.name }];
  board.save((err, board) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Board not created, Something wrong!!!",
      });
    }
    res.json(board);
  });
};

exports.isMemberOfBoard = (req, res, next) => {
  if (
    !req.board.members.some(
      (member) => member._id.toString() === req.profile._id.toString()
    )
  ) {
    return res.status(400).json({
      error: "You are not member of this board",
    });
  }
  next();
};

exports.addUsersToBoard = (req, res) => {
  let board = new Board(req.body);
  Board.updateOne({ _id: board._id }, board, (err, board) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    res.json(board);
  });
};

exports.removeUserFromBoard = (req, res) => {
  let board = new Board(req.board);
  let member = {
    _id: req.body.member_id,
    name: req.body.member_name,
  };
  board.members = board.members.filter((m) => m._id !== member._id);
  board.save((err, board) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    res.json(board);
  });
};
