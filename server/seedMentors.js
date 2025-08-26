const mongoose = require('mongoose');
const Mentor = require('./models/Mentor');

mongoose.connect('mongodb://localhost:27017/empowerher');

const mentors = [
  {
    name: "Sarah Chen",
    expertise: "AI Research",
    bio: "AI researcher focused on ethical AI development.",
    details: "PhD in Computer Science, 8 years at Google DeepMind, published 20+ papers.",
    languages: ["English", "Mandarin"],
    rating: 4.9
  },
  {
    name: "Dr. Amina Osman",
    expertise: "Data Science",
    bio: "Senior data scientist with expertise in analytics.",
    details: "12 years at Microsoft Africa, led multiple teams, expert in big data.",
    languages: ["English", "Yoruba", "French"],
    rating: 4.8
  }
];

Mentor.insertMany(mentors).then(() => {
  console.log('Mentors seeded');
  mongoose.connection.close();
});
