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

module.exports = router;
