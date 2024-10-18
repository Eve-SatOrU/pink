const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Story = sequelize.define('Story', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    likes_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });
  
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

module.exports = { Story, Like };