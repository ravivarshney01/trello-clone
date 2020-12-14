const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { logout, signup, login } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 6 char").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is wrong").isLength({ min: 6 }),
  ],
  login
);
router.get("/logout", logout);

module.exports = router;
