// Define model
const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize-config');

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true // A session may or may not be associated with a user
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false
  },
  SessionId: {
    type: DataTypes.STRING,
    allowNull: true // Additional session data (serialized JSON)
  }
});

module.exports = Session;
