const mongoose = require('mongoose');

const dashboardUserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String // hashed
});

module.exports = mongoose.model('DashboardUser', dashboardUserSchema);
