import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Star, Calendar, MapPin, Clock } from "lucide-react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

const MentorDetail = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    api.get(`/api/mentors/${id}`)
      .then(res => {
        if (res.data && res.data.name) {
          setMentor(res.data);
        } else {
          // fallback demo data
          setMentor({
            id: 1,
            name: "Sarah Chen",
            expertise: "AI Research",
            bio: "AI researcher focused on ethical AI development.",
            details: "PhD in Computer Science, 8 years at Google DeepMind, published 20+ papers.",
            languages: ["English", "Mandarin"],
            rating: 4.9
          });
        }
      })
      .catch(err => {
        console.error("Error fetching mentor:", err);
        // fallback demo data
        setMentor({
          id: 1,
          name: "Sarah Chen",
          expertise: "AI Research",
          bio: "AI researcher focused on ethical AI development.",
          details: "PhD in Computer Science, 8 years at Google DeepMind, published 20+ papers.",
          languages: ["English", "Mandarin"],
          rating: 4.9
        });
      });
  }, [id]);

  if (!mentor) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4">
            <div className="bg-card p-8 rounded-xl soft-shadow border border-border">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mr-6 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-primary">{mentor.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-2">{mentor.name}</h2>
                  <p className="text-secondary font-medium mb-1">{mentor.expertise}</p>
                  <div className="flex items-center text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {mentor.rating}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-lg mb-4">{mentor.bio}</p>
              <div className="mb-4">
                <h3 className="font-bold mb-2">Details</h3>
                <p>{mentor.details}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-bold mb-2">Languages</h3>
                <p>{mentor.languages.join(', ')}</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline">Book Session</Button>
                <Button variant="secondary">Message Mentor</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MentorDetail;
