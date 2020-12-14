const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        message: "User signup failed",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User does not exists",
      });
    }
    if (!user) {
      return res.status(400).json({
        error: "User does not exists",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email-password do not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { name, email, _id, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User logout success",
  });
};

exports.isLoggedIn = expressJwt({
  secret: "MyTopSecret",
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.auth._id == req.profile._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};
