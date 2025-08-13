import { Trophy } from "lucide-react";

const BusinessPitchHero = () => {
  return (
    <section className="py-20 bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <Trophy className="w-16 h-16 mx-auto mb-6 animate-festival-float" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Business Pitch Contest
        </h1>
        <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
          Pitch your business idea to industry experts and compete for funding
          opportunities
        </p>
      </div>
    </section>
  );
};

export default BusinessPitchHero;