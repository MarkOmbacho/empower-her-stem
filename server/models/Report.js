const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: String,
  description: String,
  // reporter: String, // removed for anonymity
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Report', reportSchema);
