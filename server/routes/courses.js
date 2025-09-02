const express = require('express');
const Course = require('../models/Course');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// public: list courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// public: course details
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});

// auth middleware for dashboard/tutor actions
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '') || req.query.token || req.headers['x-access-token'];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// protected: create a new course
router.post('/', requireAuth, async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// protected: add module to a course
router.put('/:id/modules', requireAuth, async (req, res) => {
  try {
    const { title, notes, quiz } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    const nextId = (course.modules?.length || 0) + 1;
    course.modules = course.modules || [];
    course.modules.push({ id: nextId, title, notes, quiz: quiz || [] });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
