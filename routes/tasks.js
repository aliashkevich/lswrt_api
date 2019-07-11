const express = require('express');
const router = express.Router();
const tasks = require('../data/tasks.json');

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

router.post('/', (req, res, next) => {
  const projectId = req.body.projectId;
  const numOfTasks = tasks.filter(task => task.projectId == projectId).length;
  let newTaskId;
  if (numOfTasks > 0) {
    if (numOfTasks < 10) {
      newTaskId = projectId + '-0' + parseInt(numOfTask + 1);
    } else if (numOfTasks > 10) {
      newTaskId = projectId + '-' + parseInt(numOfTask + 1);
    }
  }
  if (numOfTasks == 0) {
    newTaskId = projectId + '-' + '01';
  }
  const taskData = {
    id: newTaskId,
    projectId: projectId,
    title: req.body.title,
    summary: req.body.summary,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    assignee: req.body.assignee,
    status: req.body.status,
  };
  tasks.push(taskData);
  res.json({tasks});
});

router.put('/:id', (req, res, next) => {
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
});

router.delete('/:id', (req, res, next) => {
  var task = tasks.find(task => task.id == req.params.id);
  var index = tasks.indexOf(task);
  if (index == -1) {
    res.send(`Task '${req.params.id}' doesn't exist`);
  } else {
    tasks.splice(index, 1);
    res.json({tasks});
  }
});

module.exports = router;
