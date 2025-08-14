import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg hero-gradient">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground">
                  Girls I Save
                </h2>
                <p className="text-sm text-muted-foreground">
                  Empowering Women in STEM
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Creating safe spaces for women to thrive in STEM fields while combating 
              gender-based violence through education, mentorship, and community support.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-smooth cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-smooth cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-smooth cursor-pointer" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-smooth cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/learning" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  STEM Academy
                </Link>
              </li>
              <li>
                <Link 
                  to="/mentors" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Find a Mentor
                </Link>
              </li>
              <li>
                <Link 
                  to="/report" 
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Report GBV
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">
                  Nairobi Innovation Hub
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a 
                  href="mailto:support@girls-i-save.org"
                  className="text-muted-foreground text-sm hover:text-primary transition-smooth"
                >
                  support@girls-i-save.org
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <a 
                  href="tel:+254700123456"
                  className="text-muted-foreground text-sm hover:text-primary transition-smooth"
                >
                  +254-700-123456
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-destructive/10 rounded-lg">
              <p className="text-xs text-destructive font-medium">
                Crisis Hotline: Available 24/7
              </p>
              <p className="text-xs text-muted-foreground">
                Immediate help for urgent situations
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Girls I Save. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to="/privacy" 
                className="text-muted-foreground text-sm hover:text-primary transition-smooth"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-muted-foreground text-sm hover:text-primary transition-smooth"
              >
                Terms of Service
              </Link>
              <Link 
                to="/admin" 
                className="text-muted-foreground text-sm hover:text-primary transition-smooth"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;