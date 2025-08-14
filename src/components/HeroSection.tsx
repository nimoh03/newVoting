import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, Award, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

// Import your images
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";

// Updated carousel images with imported sources
const carouselImages = [
  {
    src: image1, // Use imported image
    alt: "",
    title: "Oyo State Youth and Business Festival",
    subtitle: "Made In Ibadan",
    theme: "Made in Ibadan"
  },
  {
    src: image2, // Use imported image
    alt: "Young Entrepreneurs Networking",
    title: "Connect & Network",
    subtitle: "With Industry Leaders",
    theme: "Made in Ibadan"
  }
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const ctaButtons = [
    {
      label: "Register for Business Pitch",
      variant: "hero" as const,
      href: "/register-business-pitch",
      icon: Award,
      description: "Compete for amazing prizes",
    },
    {
      label: "Book Exhibition Stand",
      variant: "festival" as const,
      href: "/book-vendor-stand",
      icon: Users,
      description: "Showcase your business",
    },
    {
      label: "Register as a nominee",
      href: "/login",
      icon: Calendar,
      description: "Join the celebration",
    },
    {
      label: "Buy Grand Finale Dinner Ticket",
      variant: "festival-gold" as const,
      href: "/buy-dinner-ticket",
      icon: MapPin,
      description: "Exclusive networking dinner",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in-up").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-8 md:pt-0">
      {/* Carousel Container */}
      <div className="relative w-full h-full min-h-screen">
        {/* Slides */}
        <div className="relative w-full h-full">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out min-h-screen ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
              </div>

              {/* Content for each slide */}
              <div className="relative z-10 container mx-auto px-4 h-full min-h-screen flex items-center justify-center py-8">
                <div className="max-w-6xl mx-auto text-center">
                  {/* Dynamic Title per slide */}
                  <div className="fade-in-up mb-6 md:mb-8">
                    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                      <span className="block text-gradient bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        {image.title}
                      </span>
                      <span className="block text-white">
                        {image.subtitle}
                      </span>
                    </h1>

                    {/* Year with decorative elements */}
                    <div className="relative inline-block mb-4 md:mb-6">
                      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-heading font-black text-yellow-400">
                        2025
                      </span>
                      <Sparkles className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
                      <Star className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 text-emerald-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Only show date/location and CTA buttons on first slide */}
                  {index === 0 && (
                    <>
                      {/* Date and Location */}
                      <div className="fade-in-up mb-6 md:mb-8" style={{ animationDelay: "0.3s" }}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white">
                          <div className="backdrop-blur-md bg-white/10 rounded-full px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-3">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                            <span className="font-semibold text-sm sm:text-lg">
                              September 8–14, 2025
                            </span>
                          </div>
                          <div className="hidden sm:block w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                          <div className="backdrop-blur-md bg-white/10 rounded-full px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-3">
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                            <span className="font-semibold text-sm sm:text-lg">Ibadan, Oyo State</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div
                        className="fade-in-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 md:mb-8"
                        style={{ animationDelay: "0.4s" }}
                      >
                        {ctaButtons.map((button, buttonIndex) => {
                          const IconComponent = button.icon;
                          
                          return (
                            <div
                              key={button.href}
                              className="group"
                              style={{ animationDelay: `${buttonIndex * 0.1}s` }}
                            >
                              <Button
                                variant={button.variant}
                                size="lg"
                                onClick={() => navigate(button.href)}
                                className={`w-full h-20 sm:h-28 text-xs sm:text-sm font-bold ${
                                  button.label === "Register as a nominee"
                                    ? "bg-black hover:bg-gray-900"
                                    : ""
                                } backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/30 hover:border-yellow-400/50 transition-all duration-300`}
                              >
                                <div className="flex flex-col items-center gap-1 sm:gap-2">
                                  <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 group-hover:animate-bounce text-white" />
                                  <div className="text-center text-white">
                                    <div className="font-bold text-xs sm:text-sm">{button.label}</div>
                                    <div className="text-xs opacity-90 hidden sm:block">
                                      {button.description}
                                    </div>
                                  </div>
                                </div>
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Different content for other slides */}
                  {index === 1 && (
                    <div className="fade-in-up backdrop-blur-md bg-white/10 rounded-3xl p-6 md:p-8 border border-white/30 mx-4">
                      <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed">
                        Connect with <span className="text-yellow-400 font-bold">industry leaders</span> and fellow entrepreneurs in meaningful networking sessions designed to foster collaboration and growth.
                      </p>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="fade-in-up backdrop-blur-md bg-white/10 rounded-3xl p-6 md:p-8 border border-white/30 mx-4">
                      <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed">
                        Present your <span className="text-emerald-400 font-bold">innovative solutions</span> and compete for recognition in our comprehensive business pitch competition.
                      </p>
                    </div>
                  )}

                  {index === 3 && (
                    <div className="fade-in-up backdrop-blur-md bg-white/10 rounded-3xl p-6 md:p-8 border border-white/30 mx-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div className="text-center">
                          <div className="text-3xl sm:text-4xl font-bold text-yellow-400">7</div>
                          <div className="text-xs sm:text-sm text-white/80">Days of Events</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl sm:text-4xl font-bold text-emerald-400">1000+</div>
                          <div className="text-xs sm:text-sm text-white/80">Participants Expected</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl sm:text-4xl font-bold text-purple-400">₦5M</div>
                          <div className="text-xs sm:text-sm text-white/80">Total Prize Pool</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 rounded-full p-1 sm:p-2 transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 rounded-full p-1 sm:p-2 transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white/80 w-6 sm:w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;