const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  level: String,
  tutor: String,
  rating: Number,
  students: Number,
  category: String,
  modules: [
    {
      id: Number,
      title: String,
      notes: String,
      quiz: [
        {
          question: String,
          options: [String],
          answer: Number
        }
      ]
    }
  ],
  thumbnail: String
});

module.exports = mongoose.model('Course', courseSchema);
