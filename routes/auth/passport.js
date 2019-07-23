const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const JWTStrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;
const users = require('../../data/users.json');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    function(email, password, cb) {
      let user = users.find(user => user.email === email);
      if (user === undefined)
        cb(null, false, {message: 'Incorrect email or password.'});
      else if (!bcrypt.compareSync(password, user.password))
        cb(null, false, {message: 'Incorrect email or password.'});
      else if (bcrypt.compareSync(password, user.password)) cb(null, user);
      else cb(null, false, {message: 'Incorrect email or password.'});
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    function(jwtPayload, cb) {
      return cb(null, jwtPayload);
    },
  ),
);

module.exports = passport;
