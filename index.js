const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

app.listen(15500, () => {
  console.log('Server started on port 15500');
});
