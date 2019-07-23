const express = require('express');
const router = express.Router();
const tasks = require('../data/tasks.json');
const passport = require('./auth/passport');

router.get('/', function(req, res, next) {
  res.json({
    tasks,
  });
});

router.get('/:id', function(req, res, next) {
  const task = tasks.find(task => task.id == req.params.id);
  if (task === undefined) {
    res.send(`There is no task with id '${req.params.id}'`).status(404);
  } else {
    res.json({task});
  }
});

router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res, next) => {
    const projectId = req.body.projectId;
    const numOfTasks = tasks.filter(task => task.projectId == projectId).length;
    let newTaskId;
    if (numOfTasks == 0) {
      newTaskId = projectId + '-' + '01';
    } else {
      let nextNum = numOfTasks + 1;
      if (numOfTasks < 10) {
        newTaskId = projectId + '-0' + parseInt(nextNum);
      } else {
        newTaskId = projectId + '-' + parseInt(nextNum);
      }
    }

    const taskData = {
      id: newTaskId,
      projectId: projectId,
      status: req.body.status,
      title: req.body.title,
      summary: req.body.summary,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      estimation: req.body.estimation,
      userId: req.body.assignee,
    };

    tasks.push(taskData);
    res.json({tasks});
  },
);

router.put(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res, next) => {
    const editedTask = req.body;
    var task = tasks.find(task => task.id == req.params.id);
    var index = tasks.indexOf(task);
    if (index == -1) {
      res.send(`Task '${req.params.id}' doesn't exist`);
    } else {
      editedTask.status
        ? (tasks[index].status = editedTask.status)
        : tasks[index].status;
    }
    res.json({tasks});
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res, next) => {
    var task = tasks.find(task => task.id == req.params.id);
    var index = tasks.indexOf(task);
    if (index == -1) {
      res.send(`Task '${req.params.id}' doesn't exist`);
    } else {
      tasks.splice(index, 1);
      res.json({tasks});
    }
  },
);

module.exports = router;
