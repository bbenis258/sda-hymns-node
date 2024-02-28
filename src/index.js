const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const routes = require('./router/routes');
const swaggerDocs = require('./config/swagger')

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());

app.use('/', routes);

const port = 15500;

app.listen(port, () => {
  console.log('Server started on port 15500');
});

swaggerDocs(app, port);
