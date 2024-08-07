const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize-config');
const User = require('../models/users');

const tickets = sequelize.define('tickets', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model:User,
      key:"UserID"
    }
  },

});

module.exports = tickets;
