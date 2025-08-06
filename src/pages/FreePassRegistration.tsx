import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Ticket, Download, Calendar, Users, Building, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FreePassRegistration = () => {
  const { toast } = useToast();

  const eventDays = [
    { id: "summit", label: "Sept 8 - Business Summit", icon: Users },
    { id: "pitch", label: "Sept 12 - Pitch Contest", icon: Trophy },
    { id: "tradefair", label: "Sept 9-11 - Trade Fair", icon: Building },
    { id: "all", label: "All Festival Days", icon: Calendar }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Free Pass Generated!",
      description: "Your digital entry pass has been sent to your email and WhatsApp. Check your messages for the QR code.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Ticket className="w-16 h-16 mx-auto mb-6 animate-festival-float" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Your Free Festival Pass</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Access all festival events with your complimentary digital entry pass
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-festival-light-green/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Free Pass Includes</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {eventDays.slice(0, 3).map((event) => {
              const IconComponent = event.icon;
              return (
                <Card key={event.id} className="text-center hover:shadow-primary transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-festival-green rounded-full flex items-center justify-center mx-auto mb-2">
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-sm">{event.label.split(' - ')[1]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{event.label.split(' - ')[0]}</p>
                  </CardContent>
                </Card>
              );
            })}
            <Card className="text-center hover:shadow-gold transition-all duration-300 border-festival-gold">
              <CardHeader>
                <div className="w-12 h-12 bg-festival-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <Download className="w-6 h-6 text-foreground" />
                </div>
                <CardTitle className="text-sm">Digital QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Instant mobile access</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Register for Your Free Pass</CardTitle>
              <CardDescription>
                Fill out the form below to receive your digital festival entry pass
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" placeholder="Enter your full name" required />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="+234 800 000 0000" required />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                    <Input id="whatsapp" type="tel" placeholder="+234 800 000 0000" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required />
                </div>

                <div>
                  <Label htmlFor="profession">Profession/Business Type *</Label>
                  <Input id="profession" placeholder="e.g., Student, Entrepreneur, Business Owner" required />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block">Which day(s) will you attend? *</Label>
                  <div className="space-y-4">
                    {eventDays.map((event) => {
                      const IconComponent = event.icon;
                      return (
                        <div key={event.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-festival-light-green/30 transition-colors">
                          <Checkbox id={event.id} />
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="w-8 h-8 bg-festival-green/10 rounded-full flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-festival-green" />
                            </div>
                            <Label htmlFor={event.id} className="flex-1 cursor-pointer font-medium">
                              {event.label}
                            </Label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-festival-light-green/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-festival-green mb-2 flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    What You'll Receive
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Digital entry pass sent to your email</li>
                    <li>• QR code ticket via WhatsApp</li>
                    <li>• Access to all selected festival events</li>
                    <li>• Event reminders and updates</li>
                  </ul>
                </div>

                <Button type="submit" variant="festival" size="lg" className="w-full">
                  <Ticket className="w-4 h-4 mr-2" />
                  Generate My Free Pass
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Your digital pass will be sent immediately after registration
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FreePassRegistration;