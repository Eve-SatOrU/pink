const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const { v4: uuidv4 } = require('uuid');

const Story = sequelize.define('Story', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,  
    primaryKey: true,
},
  title: {
      type: DataTypes.STRING,
      allowNull: false
  },
  content: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  likes_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
  },
  author_id: {  
    type: DataTypes.UUID,
    defaultValue: uuidv4,  
    allowNull: false
  }
});

  
module.exports =  Story;
