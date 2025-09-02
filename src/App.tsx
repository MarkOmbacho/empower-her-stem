import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Opening from "./pages/Opening";
import ReportGBV from "./pages/ReportGBV";
import LearningDemo from "./pages/LearningDemo";
import MentorsDemo from "./pages/MentorsDemo";
import MentorDetailDemo from "./pages/MentorDetailDemo";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import DashboardLogin from "./pages/DashboardLogin";
import ClientDashboard from "./pages/ClientDashboard";
import TutorCourses from "./pages/TutorCourses";
import TutorCourseCreate from "./pages/TutorCourseCreate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Opening />} />
          <Route path="/report" element={<ReportGBV />} />
          <Route path="/learning" element={<LearningDemo />} />
          <Route path="/mentors" element={<MentorsDemo />} />
          <Route path="/mentor/:id" element={<MentorDetailDemo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/dashboard-login" element={<DashboardLogin />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/tutor-courses" element={<TutorCourses />} />
          <Route path="/tutor-create" element={<TutorCourseCreate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
