import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Star, Calendar, Video, MapPin, Search, Filter, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");

  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      expertise: "AI Research",
      company: "Google DeepMind",
      experience: "8 years",
      rating: 4.9,
      sessions: 247,
      availability: "Wed-Fri",
      location: "San Francisco, CA",
      specialties: ["Machine Learning", "Neural Networks", "Research Methodology"],
      bio: "AI researcher focused on ethical AI development and women in tech advocacy.",
      languages: ["English", "Mandarin"],
      timeZone: "PST"
    },
    {
      id: 2,
      name: "Dr. Amina Osman",
      expertise: "Data Science",
      company: "Microsoft Africa",
      experience: "12 years",
      rating: 4.8,
      sessions: 189,
      availability: "Mon-Wed",
      location: "Lagos, Nigeria",
      specialties: ["Big Data", "Analytics", "Leadership"],
      bio: "Senior data scientist with expertise in African market analytics and team leadership.",
      languages: ["English", "Yoruba", "French"],
      timeZone: "WAT"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      expertise: "Cybersecurity",
      company: "Cisco Security",
      experience: "10 years",
      rating: 4.9,
      sessions: 156,
      availability: "Tue-Thu",
      location: "Mexico City, MX",
      specialties: ["Network Security", "Incident Response", "Security Architecture"],
      bio: "Cybersecurity expert specializing in enterprise security and threat intelligence.",
      languages: ["English", "Spanish"],
      timeZone: "CST"
    },
    {
      id: 4,
      name: "Prof. Grace Nakamura",
      expertise: "Robotics",
      company: "MIT Robotics Lab",
      experience: "15 years",
      rating: 4.7,
      sessions: 203,
      availability: "Mon-Fri",
      location: "Boston, MA",
      specialties: ["Human-Robot Interaction", "Autonomous Systems", "Academic Research"],
      bio: "Professor and researcher in robotics with focus on assistive technologies.",
      languages: ["English", "Japanese"],
      timeZone: "EST"
    },
    {
      id: 5,
      name: "Fatima Al-Zahra",
      expertise: "Software Engineering",
      company: "Spotify",
      experience: "7 years",
      rating: 4.8,
      sessions: 134,
      availability: "Sat-Sun",
      location: "Stockholm, Sweden",
      specialties: ["Backend Development", "Scalable Systems", "Team Leadership"],
      bio: "Senior software engineer passionate about building scalable music platforms.",
      languages: ["English", "Arabic", "Swedish"],
      timeZone: "CET"
    },
    {
      id: 6,
      name: "Dr. Priya Sharma",
      expertise: "Biotech Engineering",
      company: "Genentech",
      experience: "11 years",
      rating: 4.9,
      sessions: 178,
      availability: "Wed-Fri",
      location: "San Francisco, CA",
      specialties: ["Bioinformatics", "Drug Discovery", "Computational Biology"],
      bio: "Biotechnology engineer working on breakthrough treatments and personalized medicine.",
      languages: ["English", "Hindi", "Bengali"],
      timeZone: "PST"
    }
  ];

  const expertiseAreas = [
    { value: "all", label: "All Areas" },
    { value: "AI Research", label: "AI Research" },
    { value: "Data Science", label: "Data Science" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Robotics", label: "Robotics" },
    { value: "Software Engineering", label: "Software Engineering" },
    { value: "Biotech Engineering", label: "Biotech Engineering" }
  ];

  const availabilityOptions = [
    { value: "all", label: "Any Time" },
    { value: "weekdays", label: "Weekdays" },
    { value: "weekends", label: "Weekends" },
    { value: "flexible", label: "Flexible" }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = selectedExpertise === "all" || mentor.expertise === selectedExpertise;
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 hero-gradient text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Mentor Connect
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Connect with experienced professionals and industry leaders for personalized 
                guidance, career advice, and professional development.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-heading font-bold">200+</div>
                  <div className="opacity-75">Expert Mentors</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold">50+</div>
                  <div className="opacity-75">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold">95%</div>
                  <div className="opacity-75">Success Rate</div>
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
                  placeholder="Search mentors by name, expertise, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {expertiseAreas.map(area => (
                      <SelectItem key={area.value} value={area.value}>
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="whitespace-nowrap">
                  My Sessions
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mentor Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMentors.map((mentor) => (
                <div 
                  key={mentor.id}
                  className="bg-card rounded-xl p-6 soft-shadow border border-border hover:warm-shadow transition-smooth group"
                >
                  {/* Mentor Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-xl font-heading font-bold text-primary">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-smooth">
                          {mentor.name}
                        </h3>
                        <p className="text-secondary font-medium">{mentor.expertise}</p>
                        <p className="text-sm text-muted-foreground">{mentor.company}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{mentor.sessions} sessions</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {mentor.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {mentor.specialties.slice(0, 3).map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{mentor.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Available: {mentor.availability}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{mentor.experience} experience</span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      Languages: {mentor.languages.join(', ')}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 group-hover:scale-105 transition-bounce"
                      size="sm"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="group-hover:scale-105 transition-bounce"
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredMentors.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  No mentors found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                How Mentorship Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our platform makes it easy to connect with the right mentor for your goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  1. Find Your Mentor
                </h3>
                <p className="text-muted-foreground">
                  Browse our diverse community of experts and find someone who aligns with your goals and interests.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  2. Schedule Sessions
                </h3>
                <p className="text-muted-foreground">
                  Book one-on-one sessions at convenient times. Choose from video calls, phone calls, or in-person meetings.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  3. Grow Together
                </h3>
                <p className="text-muted-foreground">
                  Receive personalized guidance, build your network, and accelerate your career with ongoing support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mentors;