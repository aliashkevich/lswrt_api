const express = require('express');
const router = express.Router();
const roles = require('../data/roles.json');

router.get('/', function(req, res, next) {
  res.json({
    roles,
  });
});

router.get('/:id', function(req, res, next) {
  const role = roles.find(role => role.id == req.params.id);
  if (role === undefined) {
    res.send(`There is no role with id '${req.params.id}'`).status(404);
  } else {
    res.json({role});
  }
});

module.exports = router;
