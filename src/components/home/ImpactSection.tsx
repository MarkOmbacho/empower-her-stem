import { useState } from "react";
import { MapPin, Globe, Users, TrendingUp, Award, Heart } from "lucide-react";

const ImpactSection = () => {
  const [selectedRegion, setSelectedRegion] = useState("nairobi");

  const regions = [
    { id: "nairobi", name: "Nairobi", users: 4200, coordinates: { x: 45, y: 60 } },
    { id: "mombasa", name: "Mombasa", users: 1800, coordinates: { x: 50, y: 75 } },
    { id: "kisumu", name: "Kisumu", users: 2100, coordinates: { x: 35, y: 65 } },
    { id: "eldoret", name: "Eldoret", users: 1400, coordinates: { x: 38, y: 55 } },
    { id: "nakuru", name: "Nakuru", users: 1600, coordinates: { x: 40, y: 62 } },
    { id: "thika", name: "Thika", users: 900, coordinates: { x: 47, y: 58 } }
  ];

  const achievements = [
    {
      icon: Users,
      number: "12,000+",
      label: "Women Empowered",
      description: "Across 6 major cities in Kenya"
    },
    {
      icon: Globe,
      number: "85%",
      label: "Career Advancement",
      description: "Of participants report career growth"
    },
    {
      icon: Award,
      number: "500+",
      label: "Certifications Earned",
      description: "In STEM fields and leadership"
    },
    {
      icon: Heart,
      number: "98%",
      label: "Safety Rating",
      description: "User satisfaction with our platform"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
            <TrendingUp className="h-4 w-4 text-primary mr-2" />
            <span className="text-primary font-medium">Our Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Transforming Lives Across Kenya
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From Nairobi to Mombasa, our platform has created lasting change in communities 
            across Kenya, empowering women through education, safety, and opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <div className="relative">
            <div className="bg-card rounded-xl p-8 soft-shadow border border-border">
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                Active Communities
              </h3>
              
              {/* Simplified Kenya Map */}
              <div className="relative h-80 bg-muted/30 rounded-lg overflow-hidden">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Simplified Kenya outline */}
                  <path
                    d="M20,20 L80,20 L80,85 L60,85 L60,90 L40,90 L40,85 L20,85 Z"
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--border))"
                    strokeWidth="0.5"
                  />
                  
                  {/* City markers */}
                  {regions.map((region) => (
                    <g key={region.id}>
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r={selectedRegion === region.id ? "3" : "2"}
                        fill={selectedRegion === region.id ? "hsl(var(--primary))" : "hsl(var(--secondary))"}
                        className="cursor-pointer transition-all duration-300 hover:r-3"
                        onClick={() => setSelectedRegion(region.id)}
                      />
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="6"
                        fill={selectedRegion === region.id ? "hsl(var(--primary) / 0.2)" : "hsl(var(--secondary) / 0.2)"}
                        className="animate-pulse"
                      />
                    </g>
                  ))}
                </svg>
                
                {/* Region info overlay */}
                <div className="absolute top-4 right-4 bg-card p-3 rounded-lg border border-border soft-shadow">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">
                        {regions.find(r => r.id === selectedRegion)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {regions.find(r => r.id === selectedRegion)?.users.toLocaleString()} users
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Region List */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    className={`p-2 rounded-lg text-left transition-smooth ${
                      selectedRegion === region.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <p className="font-medium text-sm">{region.name}</p>
                    <p className="text-xs opacity-75">
                      {region.users.toLocaleString()} users
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Measurable Impact
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl soft-shadow border border-border hover:warm-shadow transition-smooth"
                >
                  <div className="flex items-center justify-between mb-3">
                    <achievement.icon className="h-8 w-8 text-primary" />
                    <div className="text-right">
                      <div className="text-2xl font-heading font-bold text-foreground">
                        {achievement.number}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {achievement.label}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Success Stories Preview */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20">
              <h4 className="font-heading font-bold text-foreground mb-3">
                Success Stories
              </h4>
              <blockquote className="text-muted-foreground italic mb-3">
                "Thanks to Girls I Save, I not only found safety when I needed it most, 
                but also discovered my passion for data science. Now I'm working at a 
                leading tech company in Nairobi."
              </blockquote>
              <cite className="text-sm font-medium text-primary">
                — Sarah K., Data Scientist
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;