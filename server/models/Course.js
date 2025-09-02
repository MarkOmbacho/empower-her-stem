const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  published: { type: Boolean, default: false },
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
      content: String,
      resources: [String],
      certificate: { type: Boolean, default: false },
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

courseSchema.set('timestamps', true);

module.exports = mongoose.model('Course', courseSchema);
