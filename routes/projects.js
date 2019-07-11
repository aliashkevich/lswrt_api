const express = require('express');
const router = express.Router();
const projects = require('../data/projects.json');
const users = require('../data/users.json');
var tasks = require('../data/tasks.json');

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
  const lastProjectId = projects[projects.length - 1].id;
  const lastProjectIdYear = lastProjectId.split('-')[0];
  const lastProjectIdNum = lastProjectId.split('-')[1];
  const currentYear = new Date().getFullYear().toString();
  let newProjectId;
  if (lastProjectIdYear === currentYear) {
    const idIncrement = parseInt(lastProjectIdNum) + 1;
    const newProjectIdNum = idIncrement < 10 ? `0${idIncrement}` : idIncrement;
    newProjectId = currentYear + '-' + newProjectIdNum;
  } else {
    newProjectId = `${currentYear}-01`;
  }
  const projectData = {
    id: newProjectId,
    clientId: req.body.clientId,
    title: req.body.title,
    summary: req.body.summary,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    participants: req.body.participants,
  };
  projects.push(projectData);
  res.json({projects});
});

router.put('/:id', (req, res, next) => {
  const requestId = req.params.id;

  let project = projects.filter(project => {
    return project.id == requestId;
  })[0];

  if (project === undefined) {
    res.send(`There is no project with id '${requestId}'`).status(404);
  } else {
    const index = projects.indexOf(project);
    const keys = Object.keys(req.body);
    keys.forEach(key => {
      project[key] = req.body[key];
    });
    projects[index] = project;
    res.json(projects[index]);
  }
});

router.delete('/:id', (req, res, next) => {
  var project = projects.find(project => project.id == req.params.id);
  var index = projects.indexOf(project);
  if (index == -1) {
    res.send(`Project '${req.params.id}' doesn't exist`);
  } else {
    projects.splice(index, 1);
    users.forEach(function(user) {
      if (user.projectId === req.params.id) user.projectId = null;
    });
    const tasksToDelete = tasks.filter(
      task => task.projectId === req.params.id,
    );
    tasksToDelete.forEach(function(taskToDelete) {
      tasks.splice(tasks.indexOf(taskToDelete), 1);
    });
    res.send({message: `Project '${req.params.id}' successfully deleted`});
  }
});

module.exports = router;
