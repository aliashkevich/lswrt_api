const express = require('express');
const router = express.Router();
const users = require('../data/users.json');

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

module.exports = router;
