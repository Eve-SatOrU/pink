const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const { v4: uuidv4 } = require('uuid');


const Like = sequelize.define('Like', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    story_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });  


module.exports = Like ;
