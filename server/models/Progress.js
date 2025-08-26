const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  courseId: { type: Number, required: true },
  completedModules: [{ type: Number }]
});

module.exports = mongoose.model('Progress', progressSchema);
