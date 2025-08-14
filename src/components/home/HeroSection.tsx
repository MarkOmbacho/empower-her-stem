import { useState, useEffect } from "react";
import { ArrowRight, Play, Shield, BookOpen, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { number: 12000, label: "Women Empowered", icon: Users },
    { number: 5000, label: "GBV Cases Assisted", icon: Shield },
    { number: 850, label: "STEM Courses Completed", icon: BookOpen },
    { number: 95, label: "Success Rate %", icon: TrendingUp },
  ];

  // Animated counter effect
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const increment = stat.number / 100;
      let current = 0;
      
      return setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          current = stat.number;
          clearInterval(timers[index]);
        }
        
        setAnimatedStats(prev => {
          const newStats = [...prev];
          newStats[index] = Math.floor(current);
          return newStats;
        });
      }, 30);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10"></div>
      <div className="absolute inset-0 warm-gradient opacity-5"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Empowering
              <span className="text-primary block">Futures</span>
              Through
              <span className="text-secondary block">STEM & Support</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Creating safe spaces for women to thrive in STEM fields while combating 
              gender-based violence through education, mentorship, and community support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-glow text-primary-foreground transition-bounce hover:scale-105 glow-shadow"
              >
                Join Our Movement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-smooth"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>

            {/* Emergency Quick Action */}
            <div className="mt-8 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <p className="text-sm text-destructive font-medium mb-2">
                Need immediate help?
              </p>
              <Button 
                variant="destructive" 
                size="sm"
                className="transition-bounce hover:scale-105"
              >
                Emergency Support
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-card p-6 rounded-xl soft-shadow border border-border hover:warm-shadow transition-smooth cursor-pointer transform hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-heading font-bold text-foreground mb-2">
                  {animatedStats[index].toLocaleString()}
                  {stat.label.includes('%') && '%'}
                  {stat.label.includes('Women') && '+'}
                  {stat.label.includes('Cases') && '+'}
                  {stat.label.includes('Courses') && '+'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;