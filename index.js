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
const passport = require('./routes/auth/passport');

const api_path = '/api/v1';

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept',
//     'Access-Control-Request-Headers: Content-Type, Authorization',
//   );
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET,HEAD,OPTIONS,POST,PUT,DELETE',
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
//   );
//   next();
// });

// app.get('/', passport.authenticate('jwt', {session: false}), function(
//   req,
//   res,
// ) {
//   res.send(req.user);
// });

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(api_path + '/users', usersRouter);
app.use(api_path + '/clients', clientsRouter);
app.use(api_path + '/projects', projectsRouter);
app.use(api_path + '/tasks', tasksRouter);
app.use(api_path + '/roles', rolesRouter);
app.use(api_path + '/auth', authRouter);

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
