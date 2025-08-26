const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: String,
  expertise: String,
  bio: String,
  details: String,
  languages: [String],
  rating: Number
});

module.exports = mongoose.model('Mentor', mentorSchema);
