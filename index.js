const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const clientsRouter = require('./routes/clients');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const projectsRouter = require('./routes/projects');
const rolesRouter = require('./routes/roles');
const authRouter = require('./routes/auth/auth');
<<<<<<< HEAD
const passport = require('./routes/auth/passport');
=======

>>>>>>> develop
const api_path = '/api/v1';

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(api_path + '/auth', authRouter);
<<<<<<< HEAD
app.use(
  api_path + '/users',
  passport.authenticate('jwt', {session: false}),
  usersRouter,
);
app.use(
  api_path + '/clients',
  passport.authenticate('jwt', {session: false}),
  clientsRouter,
);
app.use(
  api_path + '/projects',
  passport.authenticate('jwt', {session: false}),
  projectsRouter,
);
app.use(
  api_path + '/tasks',
  passport.authenticate('jwt', {session: false}),
  tasksRouter,
);
app.use(
  api_path + '/roles',
  passport.authenticate('jwt', {session: false}),
  rolesRouter,
);
=======
app.use(api_path + '/users', usersRouter);
app.use(api_path + '/clients', clientsRouter);
app.use(api_path + '/projects', projectsRouter);
app.use(api_path + '/tasks', tasksRouter);
app.use(api_path + '/roles', rolesRouter);
>>>>>>> develop

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});
