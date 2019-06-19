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

router.delete('/:id', (req, res, next) => {
  var project = projects.find(project => project.id == req.params.id);
  var index = projects.indexOf(project);
  if (index == -1) {
    res.status(404).send({message: `Project '${req.params.id}' doesn't exist`});
  } else {
    projects.splice(index, 1);
    res.send({message: `Project '${req.params.id}' successfully deleted`});
  }
});

module.exports = router;