const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const HelpRequest = sequelize.define('HelpRequest', {
    userName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    question: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'open' 
    }
  });  

module.exports = HelpRequest;