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
  const clientData = req.body;
  console.log(req.body);
  clients.push(clientData);
});

module.exports = router;
