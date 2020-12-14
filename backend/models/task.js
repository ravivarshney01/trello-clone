const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 500,
    trim: true,
  },
  assigned_members: [
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
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
  stage: {
    type: String,
    enum: ["TODO", "INDEV", "TOBEREVIEWD", "FINISHED"],
    default: "TODO",
  },
});

module.exports = mongoose.model("Task", taskSchema);
