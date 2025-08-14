import { Shield, BookOpen, Users, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PillarsSection = () => {
  const pillars = [
    {
      title: "GBV Reporting",
      description: "Secure, confidential reporting system with professional support and legal guidance for survivors of gender-based violence.",
      icon: Shield,
      link: "/report",
      features: [
        "24/7 Anonymous Reporting",
        "Legal Support Network",
        "Counseling Services",
        "Safety Planning"
      ],
      stats: "5,000+ Cases Assisted",
      color: "destructive"
    },
    {
      title: "STEM Academy",
      description: "Comprehensive online learning platform offering courses in technology, engineering, mathematics, and data science.",
      icon: BookOpen,
      link: "/learning",
      features: [
        "Interactive Courses",
        "Expert Instructors",
        "Project-Based Learning",
        "Industry Certifications"
      ],
      stats: "850+ Courses Completed",
      color: "primary"
    },
    {
      title: "Mentorship",
      description: "Connect with experienced professionals and industry leaders for career guidance and personal development.",
      icon: Users,
      link: "/mentors",
      features: [
        "1-on-1 Mentoring",
        "Group Sessions",
        "Career Guidance",
        "Networking Events"
      ],
      stats: "200+ Active Mentors",
      color: "secondary"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Our Three Pillars of Empowerment
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe in a holistic approach to women's empowerment, addressing safety, 
            education, and professional growth through our integrated platform.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={pillar.title}
              className="group bg-card rounded-xl p-8 soft-shadow hover:warm-shadow transition-smooth border border-border hover:border-primary/20 transform hover:scale-105"
            >
              {/* Icon & Title */}
              <div className="flex items-center justify-between mb-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                  pillar.color === 'destructive' ? 'bg-destructive/10' :
                  pillar.color === 'primary' ? 'bg-primary/10' :
                  'bg-secondary/10'
                }`}>
                  <pillar.icon className={`h-7 w-7 ${
                    pillar.color === 'destructive' ? 'text-destructive' :
                    pillar.color === 'primary' ? 'text-primary' :
                    'text-secondary'
                  }`} />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  pillar.color === 'destructive' ? 'bg-destructive/10 text-destructive' :
                  pillar.color === 'primary' ? 'bg-primary/10 text-primary' :
                  'bg-secondary/10 text-secondary'
                }`}>
                  {pillar.stats}
                </div>
              </div>

              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {pillar.title}
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {pillar.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mb-6">
                {pillar.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link to={pillar.link}>
                <Button 
                  variant={pillar.color === 'destructive' ? 'destructive' : 
                          pillar.color === 'primary' ? 'default' : 'secondary'}
                  className="w-full group-hover:scale-105 transition-bounce"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium">✨ Integrated Platform</span>
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
            All services work together for maximum impact
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Report safely, learn new skills, and connect with mentors - all in one secure, 
            supportive environment designed specifically for women.
          </p>
          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary-dark text-secondary-foreground transition-bounce hover:scale-105"
          >
            Explore All Features
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;