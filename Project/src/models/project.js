const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize-config');

const project = sequelize.define('project', {
  ProjectID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Project_Desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Due_Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Created_By: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Updated_By: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },

});

module.exports = project;
