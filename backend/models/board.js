const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  members: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
      },
    },
  ],
});

module.exports = mongoose.model("Board", boardSchema);
