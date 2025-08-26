const mongoose = require('mongoose');
const Course = require('./models/Course');

mongoose.connect('mongodb://localhost:27017/empowerher');

const courses = [
  {
    title: "Python for Beginners",
    description: "Learn programming fundamentals with Python through hands-on projects and real-world applications.",
    duration: "4 weeks",
    level: "Beginner",
    tutor: "Dr. Ada Lovelace",
    rating: 4.9,
    students: 2847,
    category: "programming",
    modules: [
      {
        id: 1,
        title: "Introduction to Python",
        notes: "Python is a versatile language used for web, data science, and more. In this module, you'll learn about Python's history and basic syntax.",
        quiz: [
          {
            question: "Who created Python?",
            options: ["Guido van Rossum", "Ada Lovelace", "James Gosling", "Linus Torvalds"],
            answer: 0
          },
          {
            question: "What is the file extension for Python files?",
            options: [".py", ".js", ".java", ".txt"],
            answer: 0
          }
        ]
      },
      {
        id: 2,
        title: "Variables & Data Types",
        notes: "Variables store data. Python supports types like int, float, str, and bool.",
        quiz: [
          {
            question: "Which of these is a valid variable name in Python?",
            options: ["2name", "name_2", "name-2", "@name"],
            answer: 1
          }
        ]
      },
      {
        id: 3,
        title: "Control Flow",
        notes: "Control flow lets you make decisions in code using if, elif, and else.",
        quiz: [
          {
            question: "Which keyword is used for an alternative condition in Python?",
            options: ["elseif", "elif", "else", "if"],
            answer: 1
          }
        ]
      }
    ],
    thumbnail: "python-course.jpg"
  },
  {
    title: "Web Development with React",
    description: "Build modern web applications using React, HTML, CSS, and JavaScript.",
    duration: "8 weeks",
    level: "Intermediate",
    tutor: "Marie Curie",
    rating: 4.7,
    students: 3156,
    category: "web-dev",
    modules: [
      {
        id: 1,
        title: "React Basics",
        notes: "React is a library for building user interfaces. Learn about components and JSX.",
        quiz: [
          {
            question: "What does JSX stand for?",
            options: ["JavaScript XML", "Java Syntax Extension", "JSON Syntax", "JavaScript Xtra"],
            answer: 0
          }
        ]
      },
      {
        id: 2,
        title: "Components & Props",
        notes: "Components are reusable UI pieces. Props pass data to components.",
        quiz: [
          {
            question: "How do you pass data to a child component?",
            options: ["props", "state", "context", "data"],
            answer: 0
          }
        ]
      },
      {
        id: 3,
        title: "State & Lifecycle",
        notes: "State stores data in components. Lifecycle methods let you run code at specific times.",
        quiz: [
          {
            question: "Which hook is used for state in React?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            answer: 0
          }
        ]
      }
    ],
    thumbnail: "react-course.jpg"
  }
];

Course.insertMany(courses).then(() => {
  console.log('Courses seeded');
  mongoose.connection.close();
});
