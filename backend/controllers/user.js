const Board = require("../models/board");
const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found!!!",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.secure_password = undefined;
  return res.json(req.profile);
};

exports.getUsers = (req, res) => {
  User.find({}, { _id: true, name: true }, (err, users) => {
    if (err) {
      return res.status(400).json({
        error: "Something wrong with server",
      });
    }
    res.json(users);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Updated profile Unsuccessfully, Please Try Again!",
        });
      }
      user.salt = undefined;
      user.secure_password = undefined;
      res.json(user);
    }
  );
};

exports.getUserBoards = (req, res) => {
  Board.find(
    { members: { $elemMatch: { _id: req.profile._id } } },
    (err, boards) => {
      if (err) {
        return res.status(400).json({
          error: "No board found",
        });
      }
      res.json(boards);
    }
  );
};

exports.getUserByToken = (req, res) => {
  User.findById(req.auth._id, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    user.secure_password = null;
    res.json(user);
  });
};
