import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Star, Calendar, Video, MapPin, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mentors, setMentors] = useState([]);
  const [user] = useAuthState(auth);
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/mentors")
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setMentors(res.data);
        } else {
          // fallback demo data
          setMentors([
            {
              id: 1,
              name: "Sarah Chen",
              expertise: "AI Research",
              bio: "AI researcher focused on ethical AI development.",
              details: "PhD in Computer Science, 8 years at Google DeepMind, published 20+ papers.",
              languages: ["English", "Mandarin"],
              rating: 4.9
            },
            {
              id: 2,
              name: "Dr. Amina Osman",
              expertise: "Data Science",
              bio: "Senior data scientist with expertise in analytics.",
              details: "12 years at Microsoft Africa, led multiple teams, expert in big data.",
              languages: ["English", "Yoruba", "French"],
              rating: 4.8
            }
          ]);
        }
      })
      .catch(err => {
        console.error("Error fetching mentors:", err);
        // fallback demo data
        setMentors([
          {
            id: 1,
            name: "Sarah Chen",
            expertise: "AI Research",
            bio: "AI researcher focused on ethical AI development.",
            details: "PhD in Computer Science, 8 years at Google DeepMind, published 20+ papers.",
            languages: ["English", "Mandarin"],
            rating: 4.9
          },
          {
            id: 2,
            name: "Dr. Amina Osman",
            expertise: "Data Science",
            bio: "Senior data scientist with expertise in analytics.",
            details: "12 years at Microsoft Africa, led multiple teams, expert in big data.",
            languages: ["English", "Yoruba", "French"],
            rating: 4.8
          }
        ]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 hero-gradient text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Mentor Connect</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Connect with experienced professionals and industry leaders for personalized guidance, career advice, and professional development.
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 bg-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <input placeholder="Search mentors by name or expertise..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 input input-bordered w-full" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentors.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.expertise.toLowerCase().includes(searchTerm.toLowerCase())).map(mentor => (
                  <div key={mentor.id || mentor.name} className="bg-card rounded-xl p-6 soft-shadow border border-border hover:warm-shadow transition-smooth group">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mr-4 flex items-center justify-center">
                      <span className="text-xl font-heading font-bold text-primary">{mentor.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-smooth">{mentor.name}</h3>
                      <p className="text-secondary font-medium">{mentor.expertise}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{mentor.bio}</p>
                  <div className="mb-4">
                    <Button className="w-full" onClick={() => navigate(`/mentor/${mentor.id}`)}>
                      <Users className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {mentors.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">No mentors found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Mentors;
