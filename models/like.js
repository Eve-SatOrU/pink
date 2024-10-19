const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const { v4: uuidv4 } = require('uuid');


const Like = sequelize.define('Like', {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,  
        allowNull: false
    },
    story_id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,  
        allowNull: false
    }
  });  


module.exports = Like ;
