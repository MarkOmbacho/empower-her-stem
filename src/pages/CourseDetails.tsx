

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, User, Users, CheckCircle } from "lucide-react";


type ProgressType = {
  xp: number;
  completedModules: string[];
};

type ModuleType = {
  id: string;
  title: string;
  notes: string;
  content: string;
  quiz: any[];
  certificate: boolean;
};

type CourseType = {
  id: string;
  title: string;
  description: string;
  tutor: string;
  enrolled: number;
  totalXp?: number;
  modules: ModuleType[];
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseType | null>(null);
  const [progress, setProgress] = useState<ProgressType>({ xp: 0, completedModules: [] });

  useEffect(() => {
    api.get(`/api/courses/${courseId}`).then(res => setCourse(res.data)).catch(()=>{});
    // Simulate progress
    setProgress({ xp: 100, completedModules: ["module1"] });
  }, [courseId]);

  if (!course) return <div className="p-8 text-center">Loading...</div>;

  const completedAll = progress.completedModules.length === course.modules.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pb-16">
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">{course.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{course.description}</p>
          <div className="flex flex-wrap gap-6 items-center mb-4">
            <div className="flex items-center gap-2 text-gray-600"><User className="h-5 w-5 text-blue-500" /> Tutor: <span className="font-semibold">{course.tutor}</span></div>
            <div className="flex items-center gap-2 text-gray-600"><Users className="h-5 w-5 text-purple-500" /> {course.enrolled} enrolled</div>
            <div className="flex items-center gap-2 text-gray-600"><Award className="h-5 w-5 text-yellow-500" /> Certificate: <span className="font-semibold">{completedAll ? "Earned" : "Complete all modules"}</span></div>
          </div>
          <Progress value={(progress.completedModules.length / course.modules.length) * 100} />
          <div className="mt-2 text-sm text-gray-500">Progress: {progress.completedModules.length} / {course.modules.length} modules</div>
        </div>
        <div className="space-y-8">
          {course.modules.map((mod, idx) => (
            <div key={mod.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-purple-700">{mod.title}</h2>
                {progress.completedModules.includes(mod.id) && <CheckCircle className="h-5 w-5 text-green-500" />}
                {mod.certificate && completedAll && <Award className="h-5 w-5 text-yellow-500" />}
              </div>
              <div className="mb-2 text-gray-700 font-medium">{mod.notes}</div>
              <div className="mb-4 text-gray-600">{mod.content}</div>
              <div className="mb-2 text-xs text-gray-400">XP: {50}</div>
              <Button variant={progress.completedModules.includes(mod.id) ? "secondary" : "outline"} disabled={progress.completedModules.includes(mod.id)}>
                {progress.completedModules.includes(mod.id) ? "Completed" : "Complete Module"}
              </Button>
              {mod.certificate && completedAll && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-yellow-700 font-bold text-center shadow">
                  <Award className="inline-block mr-2 h-6 w-6" />
                  Congratulations! You have earned your certificate for this course.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
