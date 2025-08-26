const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

// Submit a report
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const report = await Report.create({ title, description });
  res.json(report);
});

// Get all reports
router.get('/', async (req, res) => {
  const reports = await Report.find().sort({ date: -1 });
  res.json(reports);
});

module.exports = router;
