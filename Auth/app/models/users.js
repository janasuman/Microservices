const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize-config');

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  PasswordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  FullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserRole: {
    type: DataTypes.ENUM('Admin', 'User'),
    defaultValue:'User'
  },
  RegistrationDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = User;
