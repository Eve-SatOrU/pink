const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const { v4: uuidv4 } = require('uuid');


const Admin =sequelize.define('Admin' ,{
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,  
      primaryKey: true,
      },
      userName: Sequelize.STRING,
      userPassword: Sequelize.STRING,   
});


module.exports = Admin;