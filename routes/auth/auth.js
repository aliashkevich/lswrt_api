const passport = require('./passport');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', function(req, res) {
  passport.authenticate('local', (err, user, info) => {
    if (err) res.status(500).json({flash: err});
    if (!user) res.status(401).json({flash: info.message});
    if (user) {
      var data = {
        id: user.id,
        name: user.name,
      };

      const token = jwt.sign(data, 'your_jwt_secret');
      const flash = 'Successfully logged in!';
      return res.status(200).json({data, token, flash});
    }
  })(req, res);
});

// Use this code in case you need to add new user
// router.post('/signup', function(req, res, next) {
//   const args = {
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
//     name: req.body.name,
//     lastname: req.body.lastname,
//   };
// });

module.exports = router;
