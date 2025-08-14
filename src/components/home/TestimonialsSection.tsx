import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Amina Hassan",
      role: "Software Engineer",
      company: "Safaricom",
      image: "/placeholder-avatar-1.jpg",
      rating: 5,
      story: "After reporting harassment through Girls I Save, I not only received the support I needed but also discovered coding bootcamps that changed my career. Now I'm leading a team of developers and mentoring other young women in tech.",
      achievement: "Career Transformation",
      location: "Nairobi"
    },
    {
      id: 2,
      name: "Grace Wanjiku",
      role: "Data Scientist",
      company: "Kenya Commercial Bank",
      image: "/placeholder-avatar-2.jpg",
      rating: 5,
      story: "The mentorship program connected me with an incredible mentor who guided me through my transition from banking to data science. The STEM courses gave me the technical skills I needed to succeed.",
      achievement: "Career Pivot Success",
      location: "Kisumu"
    },
    {
      id: 3,
      name: "Faith Muthoni",
      role: "Cybersecurity Specialist",
      company: "Equity Bank",
      image: "/placeholder-avatar-3.jpg",
      rating: 5,
      story: "Girls I Save provided a safe space when I needed it most. The community support and educational resources helped me rebuild my confidence and pursue my dream career in cybersecurity.",
      achievement: "Personal & Professional Growth",
      location: "Mombasa"
    },
    {
      id: 4,
      name: "Blessing Achieng",
      role: "AI Research Engineer",
      company: "iHub Nairobi",
      image: "/placeholder-avatar-4.jpg",
      rating: 5,
      story: "From survivor to researcher - Girls I Save didn't just help me report an incident, they connected me with mentors and courses that led me to AI research. Now I'm developing solutions to help other women.",
      achievement: "From Survivor to Leader",
      location: "Eldoret"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full mb-4">
            <Quote className="h-4 w-4 text-secondary mr-2" />
            <span className="text-secondary font-medium">Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Voices of Empowerment
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real stories from women who have transformed their lives through our platform. 
            Their journeys inspire and motivate our continued mission.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <div className="bg-card rounded-2xl p-8 md:p-12 soft-shadow border border-border overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <Quote className="h-8 w-8 text-primary mr-3" />
                  <div className="flex items-center">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                  "{current.story}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <cite className="text-lg font-heading font-bold text-foreground not-italic">
                      {current.name}
                    </cite>
                    <p className="text-secondary font-medium">
                      {current.role} at {current.company}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      📍 {current.location}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="px-3 py-1 bg-primary/10 rounded-full">
                      <span className="text-sm font-medium text-primary">
                        {current.achievement}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Image & Navigation */}
              <div className="flex flex-col items-center lg:items-end">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mb-6 flex items-center justify-center">
                  <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-2xl font-heading font-bold text-muted-foreground">
                      {current.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                
                {/* Navigation Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevTestimonial}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex space-x-1">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-smooth ${
                          index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextTestimonial}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentTestimonial(index)}
              className={`p-4 rounded-lg border transition-smooth text-left ${
                index === currentTestimonial
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-card border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-muted rounded-full mr-2 flex items-center justify-center">
                  <span className="text-xs font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs opacity-75">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-xs line-clamp-2">
                {testimonial.story.substring(0, 80)}...
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;