import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});

export default router;
