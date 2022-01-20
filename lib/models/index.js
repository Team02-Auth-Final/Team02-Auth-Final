'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const messageModel = require('./messages/message.schema');
const userModel = require('./users/user.schema');
const Collection = require('./data-collection.js');


const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const message = messageModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  message: new Collection(message),
  users,
};