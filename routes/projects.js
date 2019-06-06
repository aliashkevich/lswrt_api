const express = require('express');
const router = express.Router();
const projects = require('../data/projects.json');

router.get('/', function(req, res, next) {
  res.json({
    projects,
  });
});

router.get('/:id', function(req, res, next) {
  const project = projects.find(project => project.id == req.params.id);
  if (project === undefined) {
    res.send(`There is no project with id '${req.params.id}'`).status(404);
  } else {
    res.json({project});
  }
});

module.exports = router;
