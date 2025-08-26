import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`/api/user/${user.uid}/progress`).then(res => {
        setProgress(res.data.progress);
        setCourses(res.data.courses);
      });
    }
  }, [user]);

  if (!user) {
    return <div className="p-8 text-center">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.displayName || user.email}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course: any) => (
          <div key={course.id} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <div className="mb-2">XP: {progress[course.id]?.xp || 0} / {course.totalXp}</div>
            <Progress value={((progress[course.id]?.xp || 0) / course.totalXp) * 100} />
            <div className="mt-4">
              <Button onClick={() => navigate(`/course/${course.id}`)}>Go to Course</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
