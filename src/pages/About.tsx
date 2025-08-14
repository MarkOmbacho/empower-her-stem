import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Target, Clock, Award, ExternalLink } from "lucide-react";

const About = () => {
  const timeline = [
    {
      year: "2021",
      title: "Founded in Nairobi",
      description: "Girls I Save was born from a vision to create safe spaces for women in Kenya.",
      milestone: "Platform Launch"
    },
    {
      year: "2022",
      title: "First 1,000 Users",
      description: "Reached our first milestone with women across major Kenyan cities.",
      milestone: "Growth Milestone"
    },
    {
      year: "2023",
      title: "5,000+ GBV Cases Assisted",
      description: "Expanded our support services and established partnerships with local NGOs.",
      milestone: "Impact Achievement"
    },
    {
      year: "2024",
      title: "STEM Academy Launch",
      description: "Introduced comprehensive educational platform with industry partnerships.",
      milestone: "Platform Evolution"
    },
    {
      year: "2025",
      title: "Global Mentorship Program",
      description: "Launching international mentor network to support women worldwide.",
      milestone: "Future Vision"
    }
  ];

  const team = [
    { name: "Amina", role: "Founder & CEO", expertise: "Social Entrepreneurship" },
    { name: "Blessing", role: "GBV Support Director", expertise: "Crisis Counseling" },
    { name: "Chloe", role: "STEM Education Lead", expertise: "Technical Training" },
    { name: "Diana", role: "Technology Director", expertise: "Platform Development" },
    { name: "Ebele", role: "Community Manager", expertise: "User Engagement" },
    { name: "Fatima", role: "Legal Affairs", expertise: "Women's Rights Law" },
    { name: "Grace", role: "Partnerships Lead", expertise: "Strategic Alliances" },
    { name: "Hope", role: "Marketing Director", expertise: "Brand Strategy" }
  ];

  const partners = [
    "UN Women", "Tech4Dev", "Google for Nonprofits", "Microsoft Africa",
    "Kenya ICT Authority", "Safaricom Foundation", "Equity Group Foundation",
    "iHub Nairobi"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 hero-gradient text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Our Mission
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
                Creating safe spaces for women to thrive in STEM fields while combating 
                gender-based violence through education, mentorship, and community support.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-heading font-bold">12,000+</div>
                  <div className="opacity-75">Women Empowered</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold">6</div>
                  <div className="opacity-75">Cities Served</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold">3</div>
                  <div className="opacity-75">Years of Impact</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-card p-8 rounded-xl soft-shadow border border-border">
                <Target className="h-12 w-12 text-primary mb-6" />
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower women through technology education, provide secure support for 
                  gender-based violence survivors, and create a global network of mentors 
                  dedicated to advancing women in STEM fields. We believe every woman deserves 
                  safety, education, and opportunity.
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-xl soft-shadow border border-border">
                <Award className="h-12 w-12 text-secondary mb-6" />
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every woman has access to safe spaces, quality STEM education, 
                  and professional mentorship. Where gender-based violence is eradicated through 
                  community support and education, and where women lead innovation in technology 
                  and science globally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From a local initiative in Nairobi to a platform serving thousands 
                of women across Kenya and beyond.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 hidden md:block"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={item.year} className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Content */}
                    <div className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                    }`}>
                      <div className="bg-card p-6 rounded-xl soft-shadow border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-heading font-bold text-primary">
                            {item.year}
                          </span>
                          <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                            {item.milestone}
                          </span>
                        </div>
                        <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden md:flex w-2/12 justify-center">
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    </div>
                    
                    <div className="w-full md:w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Passionate leaders dedicated to empowering women and creating positive change 
                in communities across Kenya and beyond.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div 
                  key={member.name}
                  className="bg-card p-6 rounded-xl soft-shadow border border-border hover:warm-shadow transition-smooth text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xl font-heading font-bold text-primary">
                      {member.name[0]}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.expertise}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-20 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Our Partners
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Working together with leading organizations to create lasting impact 
                and expand our reach across communities.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners.map((partner) => (
                <div 
                  key={partner}
                  className="bg-card p-6 rounded-lg soft-shadow border border-border hover:warm-shadow transition-smooth text-center flex items-center justify-center"
                >
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <ExternalLink className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium text-foreground text-sm">
                      {partner}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;