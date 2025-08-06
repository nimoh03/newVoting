import { Card } from "@/components/ui/card";
import { Mail, Phone, ExternalLink, Crown, Star, Award } from "lucide-react";
import { useEffect } from "react";

const SponsorsCarousel = () => {
  // Enhanced sponsor data with tiers
  const titleSponsors = [
    { name: "Oyo State Government", category: "Title Sponsor", logo: "🏛️", tier: "Platinum" },
  ];

  const majorSponsors = [
    { name: "First Bank Nigeria", category: "Banking Partner", logo: "🏦", tier: "Gold" },
    { name: "MTN Nigeria", category: "Telecom Partner", logo: "📱", tier: "Gold" },
    { name: "Dangote Group", category: "Strategic Partner", logo: "🏭", tier: "Gold" },
  ];

  const supportingSponsors = [
    { name: "Access Bank", category: "Financial Partner", logo: "💳", tier: "Silver" },
    { name: "Nigerian Breweries", category: "Beverage Partner", logo: "🍺", tier: "Silver" },
    { name: "Zenith Bank", category: "Banking Partner", logo: "🏧", tier: "Silver" },
    { name: "Globacom", category: "Technology Partner", logo: "🌐", tier: "Silver" },
    { name: "UBA Group", category: "Banking Partner", logo: "🏛️", tier: "Silver" },
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

  const SponsorCard = ({ sponsor, index, delay = 0 }: { sponsor: any; index: number; delay?: number }) => {
    const tierColors = {
      Platinum: "from-purple-500 to-pink-500",
      Gold: "from-yellow-400 to-orange-500", 
      Silver: "from-gray-400 to-gray-600"
    };

    const tierIcons = {
      Platinum: Crown,
      Gold: Award,
      Silver: Star
    };

    const TierIcon = tierIcons[sponsor.tier as keyof typeof tierIcons];

    return (
      <div 
        className="fade-in-up group"
        style={{ animationDelay: `${(delay + index * 0.1)}s` }}
      >
        <Card className="relative overflow-hidden glass-strong hover:shadow-aurora transition-all duration-500 hover:scale-105 border border-white/20 hover:border-festival-gold/50 h-full p-6">
          {/* Tier badge */}
          <div className={`absolute top-2 right-2 bg-gradient-to-r ${tierColors[sponsor.tier as keyof typeof tierColors]} rounded-full p-2`}>
            <TierIcon className="w-3 h-3 text-white" />
          </div>
          
          {/* Logo */}
          <div className="text-center mb-4">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 filter group-hover:drop-shadow-lg">
              {sponsor.logo}
            </div>
            
            {/* Sponsor info */}
            <h3 className="font-heading font-bold text-foreground text-lg mb-2 group-hover:text-gold-luxury transition-colors">
              {sponsor.name}
            </h3>
            
            <div className="space-y-2">
              <div className="glass rounded-full px-3 py-1 inline-block">
                <span className="text-sm font-medium text-festival-gold">{sponsor.category}</span>
              </div>
              
              <div className={`bg-gradient-to-r ${tierColors[sponsor.tier as keyof typeof tierColors]} text-white rounded-full px-3 py-1 inline-block ml-2`}>
                <span className="text-xs font-bold">{sponsor.tier}</span>
              </div>
            </div>
          </div>
          
          {/* Hover effect */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
            <div className="glass-strong rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Official Partner</p>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-gradient-aurora opacity-5 animate-aurora-dance" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 fade-in-up">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our <span className="text-gradient">Partners</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Proudly supported by <span className="text-festival-gold font-bold">leading organizations</span> committed to youth development and entrepreneurship
          </p>
        </div>

        {/* Title Sponsors */}
        <div className="mb-16">
          <div className="text-center mb-8 fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Title Sponsor</h3>
            <div className="w-24 h-1 bg-gradient-luxury mx-auto rounded-full"></div>
          </div>
          <div className="max-w-md mx-auto">
            {titleSponsors.map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor} index={index} delay={0.2} />
            ))}
          </div>
        </div>

        {/* Major Sponsors */}
        <div className="mb-16">
          <div className="text-center mb-8 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Gold Partners</h3>
            <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {majorSponsors.map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor} index={index} delay={0.4} />
            ))}
          </div>
        </div>

        {/* Supporting Sponsors */}
        <div className="mb-16">
          <div className="text-center mb-8 fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Silver Partners</h3>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {supportingSponsors.map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor} index={index} delay={0.7} />
            ))}
          </div>
        </div>

        {/* Premium Partnership CTA */}
        <div className="fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="max-w-4xl mx-auto relative group">
            <div className="glass-strong rounded-3xl p-8 md:p-12 border border-festival-gold/30 shadow-aurora hover:shadow-glow transition-all duration-500">
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-aurora opacity-10 animate-aurora-dance rounded-3xl" />
              
              <div className="relative z-10 text-center">
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Become a <span className="text-gold-luxury">Partner</span>
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join us in empowering the next generation of entrepreneurs and business leaders in Oyo State. 
                  <span className="text-festival-emerald font-semibold"> Make a lasting impact</span> on youth development.
                </p>
                
                {/* Partnership benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="glass rounded-xl p-4">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-sm font-medium text-festival-gold">Brand Visibility</div>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="text-2xl mb-2">🤝</div>
                    <div className="text-sm font-medium text-festival-emerald">Networking</div>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="text-2xl mb-2">📈</div>
                    <div className="text-sm font-medium text-festival-purple">ROI Impact</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:partnerships@oyoyouthfestival.com" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-luxury text-primary-foreground font-bold rounded-xl hover:shadow-glow transition-all duration-300 hover:scale-105 group"
                  >
                    <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Partnership Inquiries
                    <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
                  </a>
                  <a 
                    href="tel:+2348000000000" 
                    className="inline-flex items-center justify-center px-8 py-4 glass-strong border-2 border-festival-gold/50 text-foreground font-bold rounded-xl hover:border-festival-gold hover:shadow-glow transition-all duration-300 hover:scale-105 group"
                  >
                    <Phone className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Call Direct
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsCarousel;