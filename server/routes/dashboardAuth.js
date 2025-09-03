const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DashboardUser = require('../models/DashboardUser');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Register dashboard user (for demo, create one user)
router.post('/register', async (req, res) => {
  const { username, password, email, name, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await DashboardUser.create({ username, password: hashed, email, name, role });
    res.json({ user: { id: user._id, username: user.username, email: user.email, name: user.name, role: user.role } });
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
  res.json({ token, user: { id: user._id, username: user.username, email: user.email, name: user.name, role: user.role, bio: user.bio } });
});

// get current user
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ','') || req.query.token;
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await DashboardUser.findById(decoded.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
