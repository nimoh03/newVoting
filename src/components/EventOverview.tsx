import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Trophy, Utensils, Building, Vote, Play, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const EventOverview = () => {
  const events = [
    {
      date: "September 8",
      title: "Opening Ceremony & Business Summit",
      description: "Keynote speeches, panel discussions, and networking sessions with industry leaders.",
      icon: Users,
      gradient: "bg-gradient-to-br from-festival-green to-festival-emerald",
      stats: "500+ Attendees Expected"
    },
    {
      date: "September 9-11",
      title: "Trade Fair & Exhibition",
      description: "Showcase your products and services to thousands of visitors and potential partners.",
      icon: Building,
      gradient: "bg-gradient-to-br from-festival-emerald to-festival-teal",
      stats: "100+ Exhibition Stands"
    },
    {
      date: "September 12",
      title: "Business Pitch Contest",
      description: "Young entrepreneurs compete for funding and mentorship opportunities.",
      icon: Trophy,
      gradient: "bg-gradient-luxury",
      stats: "₦2M Prize Pool"
    },
    {
      date: "September 13",
      title: "Awards & Recognition",
      description: "Public voting for outstanding young entrepreneurs and businesses.",
      icon: Vote,
      gradient: "bg-gradient-to-br from-festival-purple to-festival-teal",
      stats: "₦50 Per Vote"
    },
    {
      date: "September 14",
      title: "Grand Finale Dinner",
      description: "Elegant closing ceremony with awards presentation and entertainment.",
      icon: Utensils,
      gradient: "bg-gradient-aurora",
      stats: "VIP Networking Event"
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
    <section className="py-24 relative overflow-hidden">
      {/* Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
      <div className="absolute inset-0 bg-gradient-aurora opacity-5 animate-aurora-dance" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 fade-in-up">
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Festival <span className="text-gradient">Events</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            Seven days of inspiring events designed to empower, connect, and celebrate 
            <span className="text-festival-gold font-bold"> young entrepreneurs</span> across Oyo State.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {events.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <div 
                key={index} 
                className="fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="relative overflow-hidden glass-strong hover:shadow-aurora transition-all duration-500 hover:scale-105 border border-white/20 hover:border-festival-gold/50 h-full">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 ${event.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  <CardHeader className="text-center relative z-10 pb-4">
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 ${event.gradient} rounded-full flex items-center justify-center mx-auto shadow-glow group-hover:animate-festival-glow`}>
                        <IconComponent className="w-10 h-10 text-primary-foreground group-hover:animate-bounce" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-festival-gold rounded-full animate-pulse" />
                    </div>
                    
                    <div className="glass rounded-full px-4 py-2 inline-flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 text-festival-gold" />
                      <span className="text-sm font-bold text-festival-gold">{event.date}</span>
                    </div>
                    
                    <CardTitle className="text-xl font-heading font-bold text-foreground group-hover:text-gold-luxury transition-colors mb-2">
                      {event.title}
                    </CardTitle>
                    
                    <div className="text-sm font-semibold text-festival-emerald bg-festival-emerald/10 rounded-full px-3 py-1 inline-block">
                      {event.stats}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <CardDescription className="text-center text-muted-foreground leading-relaxed text-base">
                      {event.description}
                    </CardDescription>
                    
                    <div className="mt-6 flex justify-center">
                      <div className="glass-strong rounded-full px-4 py-2 flex items-center gap-2 group-hover:shadow-glow transition-all duration-300">
                        <span className="text-sm font-medium text-festival-gold">Learn More</span>
                        <ArrowRight className="w-4 h-4 text-festival-gold group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Premium Video Section */}
        <div className="fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-12">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Festival <span className="text-gold-luxury">Highlights</span>
            </h3>
            <p className="text-lg text-muted-foreground">Experience the energy and excitement from previous years</p>
          </div>
          
          <div className="max-w-6xl mx-auto relative group">
            <div className="glass-strong rounded-3xl p-8 md:p-12 border border-festival-gold/30 shadow-aurora hover:shadow-glow transition-all duration-500">
              <div className="aspect-video bg-gradient-hero rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-aurora opacity-30 animate-aurora-dance" />
                
                {/* Play button */}
                <div className="relative z-10 text-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow hover:shadow-aurora transition-all duration-300 cursor-pointer">
                    <Play className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                  <p className="text-xl md:text-2xl font-heading font-bold text-primary-foreground mb-2">
                    Festival Highlight Reel
                  </p>
                  <p className="text-sm md:text-base text-primary-foreground/80">
                    Watch highlights from 2024 and get a preview of what's coming in 2025
                  </p>
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-festival-gold/30 rounded-full animate-levitate" />
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-festival-emerald/30 rounded-full animate-scale-pulse" />
                <div className="absolute top-1/2 right-8 w-4 h-4 bg-festival-purple/30 rounded-full animate-festival-float" />
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-festival-gold mb-1">50K+</div>
                  <div className="text-sm text-muted-foreground">Video Views</div>
                </div>
                <div className="text-center glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-festival-emerald mb-1">2024</div>
                  <div className="text-sm text-muted-foreground">Last Festival</div>
                </div>
                <div className="text-center glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-festival-purple mb-1">5M+</div>
                  <div className="text-sm text-muted-foreground">Social Reach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventOverview;