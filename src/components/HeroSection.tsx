import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, Award, Sparkles, Star } from "lucide-react";
import heroImage from "@/assets/festival-hero.jpg";
import { useEffect } from "react";

const HeroSection = () => {
  const navigate = useNavigate();

  const ctaButtons = [
    {
      label: "Register for Business Pitch",
      variant: "hero" as const,
      href: "/register-business-pitch",
      icon: Award,
      description: "Compete for amazing prizes"
    },
    {
      label: "Book Exhibition Stand",
      variant: "festival" as const,
      href: "/book-vendor-stand",
      icon: Users,
      description: "Showcase your business"
    },
    {
      label: "Get Free Entry Pass",
      variant: "festival-outline" as const,
      href: "/get-free-pass",
      icon: Calendar,
      description: "Join the celebration"
    },
    {
      label: "Buy Grand Finale Dinner Ticket",
      variant: "festival-gold" as const,
      href: "/buy-dinner-ticket",
      icon: MapPin,
      description: "Exclusive networking dinner"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-up').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Particles Background */}
      <div className="particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Dynamic Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Oyo State Youth and Business Festival 2025"
          className="w-full h-full object-cover"
        />
        
        {/* Multi-layer Aurora Effect */}
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-gradient-aurora opacity-40 animate-aurora-dance" />
        
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 glass opacity-30" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-luxury rounded-full opacity-20 animate-levitate blur-xl" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-aurora rounded-full opacity-30 animate-festival-float blur-lg" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-festival-gold/30 rounded-full animate-scale-pulse" />
      <div className="absolute bottom-1/3 left-10 w-20 h-20 bg-festival-emerald/30 rounded-full animate-levitate" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Premium Title with Advanced Typography */}
          <div className="fade-in-up mb-8">
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-4 leading-tight">
              <span className="block text-gradient">Oyo State</span>
              <span className="block">Youth & Business</span>
              <span className="block text-gold-luxury animate-pulse-glow">Festival</span>
            </h1>
            
            <div className="relative inline-block">
              <span className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-gold-luxury animate-gold-shimmer">
                2025
              </span>
              <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-festival-gold animate-spin" />
              <Star className="absolute -bottom-2 -left-2 w-6 h-6 text-festival-emerald animate-pulse" />
            </div>
          </div>

          {/* Premium Theme Badge */}
          <div className="fade-in-up mb-12" style={{ animationDelay: '0.2s' }}>
            <div className="glass-strong rounded-full px-8 py-4 inline-block border border-festival-gold/50">
              <p className="text-2xl md:text-3xl font-heading font-semibold text-primary-foreground">
                Theme: <span className="text-gold-luxury">"Made in Ibadan"</span>
              </p>
            </div>
            
            {/* Enhanced Date and Location */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 text-primary-foreground/90">
              <div className="glass rounded-full px-6 py-3 flex items-center gap-3 hover-glow">
                <Calendar className="w-6 h-6 text-festival-gold" />
                <span className="font-semibold text-lg">September 8–14, 2025</span>
              </div>
              <div className="hidden sm:block w-2 h-2 bg-festival-gold rounded-full animate-pulse" />
              <div className="glass rounded-full px-6 py-3 flex items-center gap-3 hover-glow">
                <MapPin className="w-6 h-6 text-festival-emerald" />
                <span className="font-semibold text-lg">Ibadan, Oyo State</span>
              </div>
            </div>
          </div>

          {/* Premium CTA Buttons Grid */}
          <div className="fade-in-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" style={{ animationDelay: '0.4s' }}>
            {ctaButtons.map((button, index) => {
              const IconComponent = button.icon;
              return (
                <div
                  key={button.href}
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Button
                    variant={button.variant}
                    size="lg"
                    onClick={() => navigate(button.href)}
                    className="w-full h-20 text-sm font-bold shadow-elegant hover:shadow-glow transform hover:scale-105 transition-all duration-500 glass-strong border-2 border-transparent hover:border-festival-gold/50"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <IconComponent className="w-6 h-6 group-hover:animate-bounce" />
                      <div className="text-center">
                        <div className="font-bold">{button.label}</div>
                        <div className="text-xs opacity-80">{button.description}</div>
                      </div>
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Premium Festival Highlights */}
          <div className="fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="glass-strong rounded-3xl p-8 md:p-12 border border-festival-gold/30 shadow-aurora">
              <p className="text-primary-foreground/95 text-lg md:text-xl leading-relaxed font-medium">
                Join <span className="text-festival-gold font-bold">thousands</span> of young entrepreneurs, 
                innovators, and business leaders as we celebrate the entrepreneurial spirit of Oyo State. 
                Experience <span className="text-festival-emerald font-bold">7 days</span> of networking, 
                learning, competitions, and celebration of local business excellence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-festival-gold">7</div>
                  <div className="text-sm text-primary-foreground/80">Days of Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-festival-emerald">1000+</div>
                  <div className="text-sm text-primary-foreground/80">Participants Expected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-festival-purple">₦5M</div>
                  <div className="text-sm text-primary-foreground/80">Total Prize Pool</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Floating Elements with Enhanced Animation */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-luxury rounded-full opacity-40 animate-festival-float shadow-glow" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-aurora rounded-full opacity-50 animate-levitate shadow-aurora" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-festival-emerald/40 rounded-full animate-scale-pulse shadow-primary" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-festival-teal/30 rounded-full animate-rotate-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-14 h-14 bg-festival-purple/30 rounded-full animate-festival-glow" />
    </section>
  );
};

export default HeroSection;