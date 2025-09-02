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

// protected: update a course (details)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// protected: delete a course
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// protected: update a module
router.put('/:id/modules/:moduleId', requireAuth, async (req, res) => {
  try {
    const { title, notes, quiz } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    const mod = course.modules.find(m => String(m.id) === String(req.params.moduleId) || String(m._id) === String(req.params.moduleId));
    if (!mod) return res.status(404).json({ error: 'Module not found' });
    if (title !== undefined) mod.title = title;
    if (notes !== undefined) mod.notes = notes;
    if (quiz !== undefined) mod.quiz = quiz;
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// protected: delete a module
router.delete('/:id/modules/:moduleId', requireAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    course.modules = course.modules.filter(m => String(m.id) !== String(req.params.moduleId) && String(m._id) !== String(req.params.moduleId));
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// protected: add quiz question to a module
router.post('/:id/modules/:moduleId/quiz', requireAuth, async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    const mod = course.modules.find(m => String(m.id) === String(req.params.moduleId) || String(m._id) === String(req.params.moduleId));
    if (!mod) return res.status(404).json({ error: 'Module not found' });
    mod.quiz = mod.quiz || [];
    mod.quiz.push({ question, options, answer });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// protected: toggle publish state
router.put('/:id/publish', requireAuth, async (req, res) => {
  try {
    const { publish } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    course.published = !!publish;
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
