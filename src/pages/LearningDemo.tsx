import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Play, Star, Clock, Users, Award, Search, Filter, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import LoginModal from "@/components/ui/LoginModal";

// Type definitions for quiz
type Quiz = {
  question: string;
  options: string[];
  answer: number;
};

interface QuizQuestionProps {
  question: Quiz;
}

// QuizQuestion component
const QuizQuestion: React.FC<QuizQuestionProps> = ({ question }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const handleSelect = (idx: number) => {
    setSelected(idx);
    setShowResult(true);
  };
  
  return (
    <div className="mb-4">
      <div className="mb-1">{question.question}</div>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, idx) => (
          <Button
            key={idx}
            size="sm"
            variant={selected === idx ? (idx === question.answer ? "secondary" : "destructive") : "outline"}
            onClick={() => handleSelect(idx)}
            disabled={showResult}
          >
            {opt}
          </Button>
        ))}
      </div>
      {showResult && (
        <div className={`mt-2 text-sm font-bold ${selected === question.answer ? "text-green-600" : "text-red-600"}`}>
          {selected === question.answer ? "Correct!" : "Incorrect. Try again next time."}
        </div>
      )}
    </div> // This closing tag was missing
  );
};



// Export demoCourses for compatibility with CourseDetails (empty, since we fetch from backend)
export const demoCourses: any[] = [];

const Learning = () => {
  const [user] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loginOpen, setLoginOpen] = useState(false);
  const [progress, setProgress] = useState<{ [courseId: string]: string[] }>({});

  // Filter courses based on searchTerm and selectedCategory
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched courses:", data);
        setCourses(data);
      });
  }, []);

  // Remove duplicates by title (or use another unique property if needed)
  const uniqueCourses = Array.from(
    new Map(courses.map(course => [course.title, course])).values()
  );

  const filteredCourses = uniqueCourses.filter(course => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function handleModuleComplete(courseId: string, moduleId: string) {
    setProgress(prev => ({
      ...prev,
      [courseId]: prev[courseId]
        ? prev[courseId].includes(moduleId)
          ? prev[courseId]
          : [...prev[courseId], moduleId]
        : [moduleId],
    }));
  }

  // If user is logged in, show dashboard format
  if (user) {
    // Example day streak and XP calculation
    const totalXp = Object.values(progress).reduce((acc, arr) => acc + (arr.length * 50), 0); // 50 XP per module
    const dayStreak = 3; // Replace with real streak logic if available
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="py-12 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome, {user.displayName || user.email}!</h1>
              <div className="flex justify-center gap-8 mb-6">
                <div className="bg-white bg-opacity-10 rounded-lg px-6 py-4">
                  <div className="text-2xl font-bold">XP</div>
                  <div className="text-3xl">{totalXp}</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg px-6 py-4">
                  <div className="text-2xl font-bold">Day Streak</div>
                  <div className="text-3xl">{dayStreak}</div>
                </div>
              </div>
              <p className="text-lg opacity-90 mb-4">Track your progress and keep learning every day!</p>
            </div>
          </section>
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-4">
              <h2 className="text-2xl font-bold mb-6">Your Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                  <div key={course._id || course.id} className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <div className="mb-2">XP: {(progress[course._id || course.id]?.length || 0) * 50} / {course.modules.length * 50}</div>
                    <div className="mb-4">Modules Completed: {progress[course._id || course.id]?.length || 0} / {course.modules.length}</div>
                    <Button onClick={() => window.location.href = `/course/${course._id || course.id}`}>Go to Course</Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
  // If not logged in, show regular course grid with short description and tutor info
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">STEM Academy</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Master technology skills with expert-led courses designed specifically for women. Learn at your own pace with industry-certified programs.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div><div className="text-3xl font-bold">500+</div><div className="opacity-75">Courses Available</div></div>
                <div><div className="text-3xl font-bold">12,000+</div><div className="opacity-75">Students Enrolled</div></div>
                <div><div className="text-3xl font-bold">95%</div><div className="opacity-75">Completion Rate</div></div>
              </div>
            </div>
          </div>
        </section>
        {/* Search & Filter */}
        <section className="py-12 bg-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search courses..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="web-dev">Web Development</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>
        {/* Course Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                  <div key={course._id || course.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300 group">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                      <BookOpen className="h-12 w-12 text-blue-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Featured</span>
                        <div className="flex items-center text-sm text-gray-500"><Star className="h-4 w-4 text-yellow-400 mr-1" />4.9</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition duration-300">{course.title}</h3>
                      <p className="text-gray-600 mb-2 line-clamp-2">{course.description}</p>
                      <div className="text-sm text-gray-500 mb-2">Tutor: <span className="font-semibold">{course.tutor}</span></div>
                      <div className="text-xs text-gray-400">{course.enrolled} enrolled</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Footer />
    </div>
  );
};

export default Learning;