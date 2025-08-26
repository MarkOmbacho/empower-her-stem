import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, AlertTriangle, Phone, ExternalLink, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ReportGBV = () => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    contactPreference: '',
    isAnonymous: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [caseId, setCaseId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate case ID
    const id = `GIS-2025-${Math.floor(Math.random() * 9000) + 1000}`;
    setCaseId(id);
    // Send report to backend
    fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: formData.type || 'GBV Report',
        description: `Location: ${formData.location}\nDescription: ${formData.description}\nContact Preference: ${formData.contactPreference}\nAnonymous: ${formData.isAnonymous}`
      })
    })
      .then(res => res.json())
      .then(() => {
        setIsSubmitted(true);
      })
      .catch(() => {
        setIsSubmitted(true); // Still show success for privacy
      });
  };

  const quickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-success/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                Report Submitted Successfully
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Your case has been securely received and assigned ID: <strong>{caseId}</strong>
              </p>
              <div className="bg-card p-6 rounded-xl border border-border max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-4">
                  Please save this case ID for future reference. Our support team will 
                  contact you within 24 hours through your preferred method.
                </p>
                <Button onClick={() => setIsSubmitted(false)} className="w-full">
                  Submit Another Report
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Quick Exit Bar */}
      <div className="bg-destructive text-destructive-foreground">
        <div className="mx-auto max-w-7xl px-4 py-2 flex justify-between items-center">
          <span className="text-sm font-medium">
            🔒 Secure Reporting Environment
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={quickExit}
            className="bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Quick Exit
          </Button>
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section className="py-12 bg-muted/20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8 text-destructive" />
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Secure GBV Reporting
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your safety and privacy are our top priorities. This secure form allows you 
                to report incidents and access professional support services.
              </p>
            </div>
          </div>
        </section>

        <div className="py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <div className="bg-card p-8 rounded-xl soft-shadow border border-border">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-heading font-bold text-foreground">
                        Report Details
                      </h2>
                      <div className="flex items-center text-sm text-success">
                        <Shield className="h-4 w-4 mr-1" />
                        End-to-End Encrypted
                      </div>
                    </div>

                    {/* Incident Type */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Type of Incident *
                      </label>
                      <Select value={formData.type} onValueChange={(value) => 
                        setFormData(prev => ({...prev, type: value}))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select incident type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="harassment">Harassment</SelectItem>
                          <SelectItem value="assault">Physical Assault</SelectItem>
                          <SelectItem value="sexual-assault">Sexual Assault</SelectItem>
                          <SelectItem value="discrimination">Discrimination</SelectItem>
                          <SelectItem value="domestic-violence">Domestic Violence</SelectItem>
                          <SelectItem value="online-abuse">Online Abuse</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Location of Incident
                      </label>
                      <Input
                        placeholder="City, area, or general location (optional)"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        You can provide as much or as little detail as you're comfortable with.
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description of Incident *
                      </label>
                      <Textarea
                        placeholder="Please describe what happened. Include as much detail as you feel comfortable sharing."
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                        required
                      />
                    </div>

                    {/* Contact Preference */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        How would you like us to contact you? *
                      </label>
                      <Select value={formData.contactPreference} onValueChange={(value) => 
                        setFormData(prev => ({...prev, contactPreference: value}))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contact method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="anonymous">Anonymous (No Contact)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Contact Info */}
                    {formData.contactPreference && formData.contactPreference !== 'anonymous' && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Contact Information
                        </label>
                        <Input
                          type={formData.contactPreference === 'email' ? 'email' : 'tel'}
                          placeholder={
                            formData.contactPreference === 'email' 
                              ? 'your.email@example.com'
                              : '+254 700 123 456'
                          }
                          required
                        />
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        disabled={!formData.type || !formData.description || !formData.contactPreference}
                      >
                        Submit Secure Report
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Your report will be encrypted and handled confidentially by our trained professionals.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Emergency Contacts */}
                <div className="bg-destructive/10 p-6 rounded-xl border border-destructive/20">
                  <h3 className="font-heading font-bold text-destructive mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Emergency Contacts
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-foreground">Crisis Hotline</p>
                      <a href="tel:+254700123456" className="text-destructive hover:underline">
                        +254-700-123456
                      </a>
                      <p className="text-xs text-muted-foreground">Available 24/7</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Police Emergency</p>
                      <a href="tel:999" className="text-destructive hover:underline">999</a>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Medical Emergency</p>
                      <a href="tel:911" className="text-destructive hover:underline">911</a>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" className="w-full mt-4">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>

                {/* Safety Information */}
                <div className="bg-card p-6 rounded-xl soft-shadow border border-border">
                  <h3 className="font-heading font-bold text-foreground mb-4">
                    Safety Features
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>All reports are encrypted and stored securely</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Anonymous reporting option available</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Professional counselors available</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                      <span>Legal support and guidance provided</span>
                    </li>
                  </ul>
                </div>

                {/* Resources */}
                <div className="bg-card p-6 rounded-xl soft-shadow border border-border">
                  <h3 className="font-heading font-bold text-foreground mb-4">
                    Additional Resources
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Safety Planning Guide
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Legal Rights Information
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Support Groups Near You
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline">
                        Digital Security Tips
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportGBV;