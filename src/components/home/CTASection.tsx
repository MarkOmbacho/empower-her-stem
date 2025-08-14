import { useState } from "react";
import { Mail, ArrowRight, CheckCircle, Users, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const benefits = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Secure reporting and support services"
    },
    {
      icon: BookOpen,
      title: "STEM Education",
      description: "Access to courses and certifications"
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "Connect with industry professionals"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 hero-gradient opacity-5"></div>
      <div className="absolute inset-0 warm-gradient opacity-10"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-3xl p-8 md:p-12 soft-shadow border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Users className="h-4 w-4 text-primary mr-2" />
                <span className="text-primary font-medium">Join Our Movement</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Be Part of the Change
                <span className="text-primary block">Empower Women Today</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of women who are transforming their lives through our platform. 
                Get exclusive access to courses, mentorship opportunities, and a supportive community.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{benefit.title}</p>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Email Signup */}
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-border focus:border-primary"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    size="lg"
                    className="bg-primary hover:bg-primary-glow text-primary-foreground h-12 px-8 transition-bounce hover:scale-105"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Join Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  🔒 We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>

            {/* Stats & Testimonial */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-heading font-bold text-primary">12,000+</div>
                  <div className="text-sm text-muted-foreground">Women Empowered</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-heading font-bold text-secondary">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-heading font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Courses Available</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-2xl font-heading font-bold text-secondary">200+</div>
                  <div className="text-sm text-muted-foreground">Active Mentors</div>
                </div>
              </div>

              {/* Featured Testimonial */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">AH</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Amina Hassan</p>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic">
                  "Girls I Save transformed my life. From finding safety to building a career 
                  in tech - this platform gave me everything I needed to succeed."
                </blockquote>
              </div>

              {/* Emergency Notice */}
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <div className="flex items-center mb-2">
                  <Shield className="h-4 w-4 text-destructive mr-2" />
                  <span className="font-medium text-destructive">Need Immediate Help?</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Our crisis support team is available 24/7 for urgent situations.
                </p>
                <Button variant="destructive" size="sm" className="w-full">
                  Get Emergency Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;