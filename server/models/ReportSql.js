const { DataTypes } = require('sequelize');
const { sequelize } = require('../lib/sql');

const ReportSql = sequelize.define('Report', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.STRING(32), allowNull: false, defaultValue: 'pending' },
  date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'reports',
  timestamps: false
});

module.exports = { ReportSql };
