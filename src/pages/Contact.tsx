import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card p-8 rounded-xl soft-shadow border border-border">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Get in Touch</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input type="email" placeholder="Email Address" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Purpose of inquiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="support">Support Request</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="press">Press Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Your message..." rows={6} />
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 text-primary mr-4" />
                      <div>
                        <p className="font-medium text-foreground">Address</p>
                        <p className="text-muted-foreground">Nairobi Innovation Hub<br />Ngong Road, Nairobi, Kenya</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-6 w-6 text-primary mr-4" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <a href="mailto:support@girls-i-save.org" className="text-primary hover:underline">
                          support@girls-i-save.org
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-6 w-6 text-primary mr-4" />
                      <div>
                        <p className="font-medium text-foreground">Crisis Hotline</p>
                        <a href="tel:+254700123456" className="text-destructive hover:underline font-medium">
                          +254-700-123456 (24/7)
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-destructive/10 p-6 rounded-xl border border-destructive/20">
                  <h3 className="font-heading font-bold text-destructive mb-3">Emergency Support</h3>
                  <p className="text-muted-foreground mb-4">
                    If you're in immediate danger or need urgent assistance, please contact our crisis hotline or local emergency services.
                  </p>
                  <Button variant="destructive" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Crisis Hotline
                  </Button>
                </div>

                <div className="bg-card p-6 rounded-xl soft-shadow border border-border">
                  <MessageCircle className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-heading font-bold text-foreground mb-3">Live Chat</h3>
                  <p className="text-muted-foreground mb-4">
                    Chat with our support team for quick answers to your questions.
                  </p>
                  <Button variant="outline" className="w-full">Start Chat</Button>
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

export default Contact;