import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Play, Star, Clock, Users, Award, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Learning = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Python for Beginners",
      description: "Learn programming fundamentals with Python through hands-on projects and real-world applications.",
      duration: "4 weeks",
      level: "Beginner",
      tutor: "Dr. Ada Lovelace",
      rating: 4.9,
      students: 2847,
      category: "programming",
      modules: 12,
      thumbnail: "python-course.jpg"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Master data analysis, visualization, and machine learning with industry-standard tools.",
      duration: "6 weeks",
      level: "Intermediate",
      tutor: "Prof. Katherine Johnson",
      rating: 4.8,
      students: 1923,
      category: "data-science",
      modules: 18,
      thumbnail: "data-science.jpg"
    },
    {
      id: 3,
      title: "Web Development with React",
      description: "Build modern web applications using React, HTML, CSS, and JavaScript.",
      duration: "8 weeks",
      level: "Intermediate",
      tutor: "Marie Curie",
      rating: 4.7,
      students: 3156,
      category: "web-dev",
      modules: 24,
      thumbnail: "react-course.jpg"
    },
    {
      id: 4,
      title: "AI Ethics & Society",
      description: "Explore the ethical implications of artificial intelligence and its impact on society.",
      duration: "3 weeks",
      level: "Beginner",
      tutor: "Dr. Safiya Noble",
      rating: 4.9,
      students: 1456,
      category: "ai-ethics",
      modules: 9,
      thumbnail: "ai-ethics.jpg"
    },
    {
      id: 5,
      title: "Robotics Engineering",
      description: "Design and build robots using Arduino, sensors, and programming fundamentals.",
      duration: "10 weeks",
      level: "Advanced",
      tutor: "Prof. Cynthia Breazeal",
      rating: 4.6,
      students: 892,
      category: "robotics",
      modules: 30,
      thumbnail: "robotics.jpg"
    },
    {
      id: 6,
      title: "Cybersecurity Basics",
      description: "Learn to protect systems and data from digital attacks and security threats.",
      duration: "5 weeks",
      level: "Beginner",
      tutor: "Dr. Dawn Song",
      rating: 4.8,
      students: 2134,
      category: "cybersecurity",
      modules: 15,
      thumbnail: "cybersecurity.jpg"
    }
  ];

  const categories = [
    { value: "all", label: "All Courses" },
    { value: "programming", label: "Programming" },
    { value: "data-science", label: "Data Science" },
    { value: "web-dev", label: "Web Development" },
    { value: "ai-ethics", label: "AI & Ethics" },
    { value: "robotics", label: "Robotics" },
    { value: "cybersecurity", label: "Cybersecurity" }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-success/10 text-success";
      case "Intermediate": return "bg-warning/10 text-warning";
      case "Advanced": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 hero-gradient text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                STEM Academy
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Master technology skills with expert-led courses designed specifically 
                for women. Learn at your own pace with industry-certified programs.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-heading font-bold">500+</div>
                  <div className="opacity-75">Courses Available</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold">12,000+</div>
                  <div className="opacity-75">Students Enrolled</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold">95%</div>
                  <div className="opacity-75">Completion Rate</div>
                </div>
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
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="whitespace-nowrap">
                  My Progress
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  className="bg-card rounded-xl overflow-hidden soft-shadow border border-border hover:warm-shadow transition-smooth group"
                >
                  {/* Course Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                    <BookOpen className="h-12 w-12 text-primary/60" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                      <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900">
                        <Play className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {course.rating}
                      </div>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-smooth">
                      {course.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="mr-4">{course.duration}</span>
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">
                        Instructor: <span className="font-medium text-foreground">{course.tutor}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {course.modules} modules
                      </p>
                    </div>

                    <Button className="w-full group-hover:scale-105 transition-bounce">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  No courses found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Learning Path CTA */}
        <section className="py-20 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-card p-8 md:p-12 rounded-3xl soft-shadow border border-border">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                    Need a Personalized Learning Path?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our AI-powered system can create a custom learning journey based on 
                    your goals, experience level, and career aspirations.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Award className="h-5 w-5 text-primary mr-3" />
                      <span>Industry-recognized certifications</span>
                    </li>
                    <li className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-3" />
                      <span>1-on-1 mentor support</span>
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="h-5 w-5 text-primary mr-3" />
                      <span>Hands-on project portfolio</span>
                    </li>
                  </ul>
                  <Button size="lg" className="bg-secondary hover:bg-secondary-dark text-secondary-foreground">
                    Create My Path
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="text-2xl font-heading font-bold text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">Job Placement Rate</div>
                  </div>
                  <div className="bg-secondary/10 p-4 rounded-lg">
                    <div className="text-2xl font-heading font-bold text-secondary">500+</div>
                    <div className="text-sm text-muted-foreground">Companies Hiring</div>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="text-2xl font-heading font-bold text-primary">40%</div>
                    <div className="text-sm text-muted-foreground">Avg. Salary Increase</div>
                  </div>
                  <div className="bg-secondary/10 p-4 rounded-lg">
                    <div className="text-2xl font-heading font-bold text-secondary">12mo</div>
                    <div className="text-sm text-muted-foreground">Career Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learning;