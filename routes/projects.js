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

router.post('/', (req, res, next) => {
  const projectData = req.body;
  projects.push(projectData);
  res.json({projects});
});

module.exports = router;
