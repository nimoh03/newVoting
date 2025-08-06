import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventOverview from "@/components/EventOverview";
import SponsorsCarousel from "@/components/SponsorsCarousel";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <EventOverview />
      <SponsorsCarousel />
      
      {/* Premium Footer */}
      <footer className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-card via-muted/50 to-card" />
        <div className="absolute inset-0 bg-gradient-aurora opacity-10 animate-aurora-dance" />
        
        <div className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Festival info */}
              <div className="lg:col-span-2">
                <h3 className="font-heading text-3xl font-bold text-foreground mb-4">
                  <span className="text-gradient">Oyo State</span> Youth and Business Festival
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  <span className="text-festival-gold font-bold">"Made in Ibadan"</span> - 
                  Empowering Tomorrow's Leaders through innovation, networking, and celebration of entrepreneurial excellence.
                </p>
                
                {/* Event details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass rounded-lg p-4">
                    <div className="text-festival-gold font-bold text-lg">September 8-14, 2025</div>
                    <div className="text-sm text-muted-foreground">7 Days of Events</div>
                  </div>
                  <div className="glass rounded-lg p-4">
                    <div className="text-festival-emerald font-bold text-lg">Ibadan, Oyo State</div>
                    <div className="text-sm text-muted-foreground">Multiple Venues</div>
                  </div>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="font-heading text-lg font-bold text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="/register-business-pitch" className="text-muted-foreground hover:text-festival-gold transition-colors">Business Pitch Contest</a></li>
                  <li><a href="/book-vendor-stand" className="text-muted-foreground hover:text-festival-gold transition-colors">Exhibition Stands</a></li>
                  <li><a href="/get-free-pass" className="text-muted-foreground hover:text-festival-gold transition-colors">Free Entry Pass</a></li>
                  <li><a href="/buy-dinner-ticket" className="text-muted-foreground hover:text-festival-gold transition-colors">Grand Finale Dinner</a></li>
                  <li><a href="/voting" className="text-muted-foreground hover:text-festival-gold transition-colors">Vote Now</a></li>
                </ul>
              </div>
              
              {/* Contact Info */}
              <div>
                <h4 className="font-heading text-lg font-bold text-foreground mb-4">Contact Us</h4>
                <div className="space-y-4">
                  <a href="mailto:info@oyoyouthfestival.com" className="flex items-center gap-3 text-muted-foreground hover:text-festival-gold transition-colors group">
                    <div className="glass rounded-full p-2 group-hover:shadow-glow transition-all duration-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm">info@oyoyouthfestival.com</span>
                  </a>
                  
                  <a href="tel:+2348000000000" className="flex items-center gap-3 text-muted-foreground hover:text-festival-gold transition-colors group">
                    <div className="glass rounded-full p-2 group-hover:shadow-glow transition-all duration-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm">+234 800 000 0000</span>
                  </a>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="glass rounded-full p-2">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Ibadan, Oyo State, Nigeria</span>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-6">
                  <h5 className="font-semibold text-foreground mb-3">Follow Us</h5>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, href: "#", color: "hover:text-blue-500" },
                      { icon: Twitter, href: "#", color: "hover:text-sky-500" },
                      { icon: Instagram, href: "#", color: "hover:text-pink-500" },
                      { icon: Linkedin, href: "#", color: "hover:text-blue-600" }
                    ].map((social, index) => {
                      const SocialIcon = social.icon;
                      return (
                        <a 
                          key={index}
                          href={social.href} 
                          className={`glass rounded-full p-2 text-muted-foreground ${social.color} transition-all duration-300 hover:shadow-glow hover:scale-110`}
                        >
                          <SocialIcon className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom bar */}
            <div className="border-t border-border/20 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  © 2025 Oyo State Government. All rights reserved.
                </div>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <a href="#" className="hover:text-festival-gold transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-festival-gold transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-festival-gold transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
