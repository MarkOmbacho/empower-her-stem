const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Progress = require('./models/Progress');
const reportsRoutes = require('./routes/reports');
const dashboardAuthRoutes = require('./routes/dashboardAuth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/empowerher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('Empower Her STEM backend is running!');
});

// API routes
app.use('/api/courses', require('./courses'));
app.use('/api/mentors', require('./mentors'));
app.use('/api/reports', reportsRoutes);
app.use('/api/dashboard-auth', dashboardAuthRoutes);

// Progress endpoints
app.get('/api/progress/:userId/:courseId', async (req, res) => {
  const { userId, courseId } = req.params;
  const progress = await Progress.findOne({ userId, courseId });
  res.json(progress || { userId, courseId, completedModules: [] });
});

app.post('/api/progress', async (req, res) => {
  const { userId, courseId, completedModules } = req.body;
  let progress = await Progress.findOne({ userId, courseId });
  if (progress) {
    progress.completedModules = completedModules;
    await progress.save();
  } else {
    progress = await Progress.create({ userId, courseId, completedModules });
  }
  res.json(progress);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
