const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,  
    primaryKey: true,
  },
  userName: Sequelize.STRING,
  email: Sequelize.STRING,
  userPassword: Sequelize.STRING,
  phone: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = User;