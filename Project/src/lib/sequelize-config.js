const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DATABASE_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:process.env.DIALECT /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

module.exports = sequelize;