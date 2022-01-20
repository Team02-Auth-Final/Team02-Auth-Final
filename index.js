'use strict';

require('dotenv').config();

//TODO update these locations

// const app = require('./lib/server');
const { start } = require('./lib/server');
const { db } = require('./lib/models');

//TODO config duplicates
// const { db } = require('./src/auth/models');
// const server = require('./src/server.js');

db.sync()
  .then(() => start(process.env.PORT || 3001))
  .catch(err => console.log(err));