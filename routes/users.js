const express = require('express');
const router = express.Router();
const users = require('../data/users.json');
const tasks = require('../data/tasks.json');
const projects = require('../data/projects.json');
const passport = require('./auth/passport');

router.get('/', function(req, res, next) {
  res.json({
    users,
  });
});

router.get('/:id', function(req, res, next) {
  const user = users.find(user => user.id == req.params.id);
  if (user === undefined) {
    res.send(`There is no user with id '${req.params.id}'`).status(404);
  } else {
    res.json({user});
  }
});

router.delete('/:id', (req, res, next) => {
  var user = users.find(user => user.id == req.params.id);
  var index = users.indexOf(user);
  if (index === -1) {
    res.send(`User '${req.params.id}' doesn't exist`);
  } else {
    users.splice(index, 1);
    tasks.forEach(function(task) {
      if (task.userId === req.params.id) task.userId = null;
    });
    projects.forEach(function(project) {
      const userId = parseInt(req.params.id);
      if (project.participants.includes(userId)) {
        var index = project.participants.indexOf(userId);
        project.participants.splice(index, 1);
      }
    });
    res.json({users});
  }
});

module.exports = router;
