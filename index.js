const express = require('express');
const users = require('./data/users.json');
const projects = require('./data/projects.json');
const roles = require('./data/roles.json');
const tasks = require('./data/tasks.json');
const clients = require('./data/clients.json');

const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const api_path = `/api/v1/`;

app.get('/', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin':
      'http://localhost:3000,http://localhost:3001,http://localhost:3002',
    'Access-Control-Allow-Methods': '*',
  });
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get(api_path + 'users', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin':
      'http://localhost:3000,http://localhost:3001,http://localhost:3002',
    'Access-Control-Allow-Methods': '*',
  });
  res.json({
    users,
  });
});

app.get(api_path + 'projects', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin':
      'http://localhost:3000,http://localhost:3001,http://localhost:3002',
    'Access-Control-Allow-Methods': '*',
  });
  res.json({
    projects,
  });
});

app.get(api_path + 'roles', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin':
      'http://localhost:3000,http://localhost:3001,http://localhost:3002',
    'Access-Control-Allow-Methods': '*',
  });
  res.json({
    roles,
  });
});

app.get(api_path + 'tasks', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin':
      'http://localhost:3000,http://localhost:3001,http://localhost:3002',
    'Access-Control-Allow-Methods': '*',
  });
  res.json({
    tasks,
  });
});

app.get(api_path + 'clients', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin':
      'http://localhost:3000,http://localhost:3001,http://localhost:3002',
    'Access-Control-Allow-Methods': '*',
  });
  res.json({
    clients,
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
