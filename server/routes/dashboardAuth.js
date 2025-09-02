const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DashboardUser = require('../models/DashboardUser');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Register dashboard user (for demo, create one user)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await DashboardUser.create({ username, password: hashed });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login dashboard user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await DashboardUser.findOne({ username });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
});

module.exports = router;
