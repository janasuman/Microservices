const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize-config');
const User = require('../models/users');
const project = require('../models/project')

const task = sequelize.define('task', {
  TaskID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Task_Desc: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Start_Date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  End_Date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Status: {
    type: DataTypes.ENUM('To Do', 'Inprogress', 'Done'),
    defaultValue:'To Do'
  },
  ProjectID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model:project,
      key:"ProjectID"
    }
  },
  Created_By: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model:User,
      key:"UserID"
    }
  },
  Updated_By: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references:{
      model:User,
      key:"UserID"
    }
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
});

module.exports = task;
