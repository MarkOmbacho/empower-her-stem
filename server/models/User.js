import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  progress: {
    type: Map,
    of: {
      xp: Number,
      completedModules: [String]
    },
    default: {}
  },
  xp: { type: Number, default: 0 }
});

export default mongoose.model("User", UserSchema);
