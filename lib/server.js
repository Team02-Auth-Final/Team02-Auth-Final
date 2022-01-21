'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');


const messageRoutes = require('./routes/message.route');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use('/api', messageRoutes);
app.use(authRoutes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on PORT:${port}`));
  },
};
