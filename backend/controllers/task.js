const Task = require("../models/task");

exports.getTasks = (req, res, next) => {
  Task.find({ board: req.board._id }, (err, tasks) => {
    if (err) {
      return res.status(400).json({
        error: "Board not found",
      });
    }
    req.tasks = tasks;
    next();
  });
};

exports.createTask = (req, res) => {
  let task = new Task(req.body);
  task.save((err, task) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong in saving the task",
      });
    }
    res.json(task);
  });
};

exports.updateTask = (req, res) => {
  Task.updateOne(
    { _id: req.body.task_id },
    {
      stage: req.body.stage,
      description: req.body.description,
      name: req.body.name,
      assigned_members: req.body.assigned_members,
    },
    (err, task) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
      res.json({
        message: "Updated successfully",
      });
    }
  );
};

exports.deleteTask = (req, res) => {
  Task.deleteOne({ _id: req.param("taskId") }, (err, task) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    res.json({
      message: "Deleted successfully",
    });
  });
};
