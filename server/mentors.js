const express = require('express');
const router = express.Router();

const Mentor = require('./models/Mentor');

router.get('/', async (req, res) => {
  const mentors = await Mentor.find();
  res.json(mentors);
});

router.get('/:id', async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);
  if (!mentor) return res.status(404).json({ error: 'Mentor not found' });
  res.json(mentor);
});

module.exports = router;
