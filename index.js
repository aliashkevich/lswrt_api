const express = require('express');
const app = express();
// const path = require('path');
const port = process.env.PORT;
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const clientsRouter = require('./routes/clients');
// const usersRouter = require('./routes/users');
// const tasksRouter = require('./routes/tasks');
// const projectsRouter = require('./routes/projects');
// const rolesRouter = require('./routes/roles');
const jwt = require('jsonwebtoken');

// const api_path = '/api/v1';

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );

// app.use(cors());

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname + '/index.html'));
  res.send('Hello');
});

// app.use(api_path + '/users', usersRouter);
// app.use(api_path + '/clients', clientsRouter);
// app.use(api_path + '/projects', projectsRouter);
// app.use(api_path + '/tasks', tasksRouter);
// app.use(api_path + '/roles', rolesRouter);

// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.post('/api/v1/login', (req, res) => {
  // mock user
  const user = {
    username: 'admin',
    email: 'admin@gmail.com',
    id: 3,
  };
  // create a JWT
  const token = jwt.sign(
    {
      user,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    },
  );

  // send
  res.json({
    message: 'Authorized success',
    token,
  });
});

app.post('/api/v1/profiles', middlewareToken, (req, res) => {
  // verify is token is correct
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      console.log(req.token);
      console.log(err);
      res.sendStatus(401);
    } else {
      res.json({
        message: 'Created Profile...',
        authData,
      });
    }
  });
});

function middlewareToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(port, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log(`Server is listening on ${port}`);
});
