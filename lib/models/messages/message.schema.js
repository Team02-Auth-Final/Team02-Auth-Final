'use strict';

const messageModel = (sequelize, DataTypes) => sequelize.define('Message', {
  username: {
    type: DataTypes.STRING,
    required: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    required: true,
  },
  content: {
    type: DataTypes.STRING,
    required: true,
  },
  signature: {
    type: DataTypes.STRING,
    required: true,
  },
  private: {
    type: DataTypes.BOOLEAN,
    default: false,
    required: true,
  },
});

module.exports = messageModel;
