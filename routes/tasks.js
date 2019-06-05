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
  const taskData = req.body;
  tasks.push(taskData);
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
