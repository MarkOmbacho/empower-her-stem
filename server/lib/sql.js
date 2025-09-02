const { Sequelize } = require('sequelize');
require('dotenv').config();

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
const db = process.env.DB_NAME || process.env.DATABASE || 'gisave_db';
const user = process.env.DB_USER || 'root';
const pass = process.env.DB_PASS || '';

const sequelize = new Sequelize(db, user, pass, {
  host,
  port,
  dialect: 'mysql',
  logging: false
});

module.exports = { sequelize };
