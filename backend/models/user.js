const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuid } = require("uuid");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    secure_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual("password")
  .set(function (pwd) {
    this._password = pwd;
    this.salt = uuid();
    this.secure_password = this.securePassword(pwd);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (pwd) {
    return this.securePassword(pwd) === this.secure_password;
  },
  securePassword: function (pwd) {
    if (!pwd) return "";
    try {
      return crypto.createHmac("sha256", this.salt).update(pwd).digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
