const express = require('express');
const router = express.Router();

const useSql = process.env.DB_NAME || process.env.DATABASE;
if (useSql) {
  const { ReportSql } = require('../models/ReportSql');

  router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const report = await ReportSql.create({ title, description });
    res.json(report);
  });

  router.get('/', async (req, res) => {
    const reports = await ReportSql.findAll({ order: [['date', 'DESC']] });
    res.json(reports);
  });
} else {
  const Report = require('../models/Report');

  router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const report = await Report.create({ title, description });
    res.json(report);
  });

  router.get('/', async (req, res) => {
    const reports = await Report.find().sort({ date: -1 });
    res.json(reports);
  });
}

module.exports = router;
