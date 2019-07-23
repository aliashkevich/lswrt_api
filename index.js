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
app.use(api_path + '/users', usersRouter);
app.use(api_path + '/clients', clientsRouter);
app.use(api_path + '/projects', projectsRouter);
app.use(api_path + '/tasks', tasksRouter);
app.use(api_path + '/roles', rolesRouter);

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
