const express = require('express');
const router = express.Router();
const clients = require('../data/clients.json');
const projects = require('../data/projects.json');
const users = require('../data/users.json');
const passport = require('./auth/passport');

router.get('/', function(req, res, next) {
  res.json({
    clients,
  });
});

router.get('/:id', function(req, res, next) {
  const client = clients.find(client => client.id == req.params.id);
  if (client === undefined) {
    res.send(`There is no user with id '${req.params.id}'`).status(404);
  } else {
    res.json({client});
  }
});

router.post('/', (req, res, next) => {
  const newClientId = clients[clients.length - 1].id + 1;
  const clientData = {
    id: newClientId,
    name: req.body.name,
    initials: req.body.initials,
    contactInformation: req.body.contactInformation,
    logo: req.body.logo,
  };
  clients.push(clientData);
  res.json({clients});
});

router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res, next) => {
    var client = clients.find(client => client.id == req.params.id);
    var index = clients.indexOf(client);
    if (index == -1) {
      res.send(`Client '${req.params.id}' doesn't exist`);
    } else {
      clients.splice(index, 1);
      users.forEach(function(user) {
        if (user.clientId === parseInt(req.params.id)) user.clientId = null;
      });
      projects.forEach(function(project) {
        if (project.clientId === parseInt(req.params.id))
          project.clientId = null;
      });
      res.json({clients});
    }
  },
);

router.put('/:id', (req, res) => {
  const requestId = req.params.id;
  const client = clients.find(client => client.id == req.params.id);
  client.name = req.body.name;
  client.initials = req.body.initials;
  client.contactInformation = req.body.contactInformation;
  if (client === undefined) {
    res.send(`There is no client with id '${requestId}'`).status(404);
  } else {
    res.send(client);
  }
});

module.exports = router;
