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
  const d = new Date();
  const lastProject = projects[projects.length - 1];
  const idNum = lastProject.id.split('-');
  const idIncrement = parseInt(idNum[1]) + 1;
  const idCheck = idIncrement < 10 ? `0${idIncrement}` : idIncrement;
  const newId = d.getFullYear() + '-' + idCheck;
  const projectData = {
    id: newId,
    client_id: req.body.client_id,
    title: req.body.title,
    summary: req.body.summary,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    participants: req.body.participants,
  };
  projects.push(projectData);
  res.json({projects});
});

router.delete('/:id', (req, res, next) => {
  var project = projects.find(project => project.id == req.params.id);
  var index = projects.indexOf(project);
  if (index == -1) {
    res.send(`Project '${req.params.id}' doesn't exist`);
  } else {
    projects.splice(index, 1);
    res.json({projects});
  }
});

module.exports = router;
