const express = require('express');
const router = express.Router();
const clients = require('../data/clients.json');

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
  };
  clients.push(clientData);
  res.json({clients});
});

router.delete('/:id', (req, res, next) => {
  var client = clients.find(client => client.id == req.params.id);
  var index = clients.indexOf(client);
  if (index == -1) {
    res.send(`Client '${req.params.id}' doesn't exist`);
  } else {
    clients.splice(index, 1);
    res.json({clients});
  }
});

module.exports = router;
