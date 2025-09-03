const mongoose = require('mongoose');

const dashboardUserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true, sparse: true },
  name: String,
  password: String, // hashed
  role: { type: String, enum: ['admin','tutor'], default: 'tutor' },
  bio: String
});

module.exports = mongoose.model('DashboardUser', dashboardUserSchema);
