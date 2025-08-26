import express from "express";
import User from "../models/User.js";
import Course from "../models/Course.js";

const router = express.Router();

// Get user progress for all courses
router.get("/:id/progress", async (req, res) => {
  const user = await User.findById(req.params.id).populate("enrolledCourses");
  if (!user) return res.status(404).json({ error: "User not found" });
  const progress = {};
  user.enrolledCourses.forEach(course => {
    progress[course._id] = user.progress.get(course._id.toString()) || { xp: 0, completedModules: [] };
  });
  res.json({ progress, courses: user.enrolledCourses });
});

// Get user progress for a specific course
router.get("/me/progress", async (req, res) => {
  // For demo, use a fixed user
  const user = await User.findOne().populate("enrolledCourses");
  const courseId = req.query.courseId;
  const course = await Course.findById(courseId);
  const userProgress = user.progress.get(courseId) || { xp: 0, completedModules: [] };
  res.json(userProgress);
});

// Enroll user in a course
router.post("/:id/enroll", async (req, res) => {
  const user = await User.findById(req.params.id);
  const { courseId } = req.body;
  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId);
    await user.save();
  }
  res.json({ enrolledCourses: user.enrolledCourses });
});

// Mark module as completed and add XP
router.post("/:id/complete", async (req, res) => {
  const user = await User.findById(req.params.id);
  const { courseId, moduleId, xp } = req.body;
  const progress = user.progress.get(courseId) || { xp: 0, completedModules: [] };
  if (!progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId);
    progress.xp += xp;
    user.xp += xp;
    user.progress.set(courseId, progress);
    await user.save();
  }
  res.json(progress);
});

export default router;
