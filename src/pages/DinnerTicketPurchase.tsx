import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Utensils, Users, Star, Camera, Crown, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DinnerTicketPurchase = () => {
  const { toast } = useToast();

  const ticketOptions = [
    {
      type: "Regular Table Seat",
      price: "₦20,000",
      features: [
        "Elegant dinner setting",
        "3-course meal",
        "Entertainment program",
        "Awards ceremony viewing",
        "Network with attendees"
      ],
      icon: Utensils,
      popular: false
    },
    {
      type: "Premium Seat",
      price: "₦100,000", 
      features: [
        "Front row seating",
        "Premium 5-course meal", 
        "Complimentary drinks",
        "Photo opportunity with award winners",
        "Priority networking access",
        "Festival souvenir package"
      ],
      icon: Star,
      popular: true
    },
    {
      type: "VIP Table for 4",
      price: "₦300,000",
      features: [
        "Reserved table for 4 guests",
        "Gourmet 7-course meal",
        "Premium bar service",
        "Private photo session",
        "Meet & greet with dignitaries",
        "Exclusive VIP lounge access",
        "Premium gift packages"
      ],
      icon: Crown,
      popular: false
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ticket Purchase Initiated!",
      description: "You'll be redirected to complete your payment. E-tickets will be sent upon confirmation.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-gold text-foreground">
        <div className="container mx-auto px-4 text-center">
          <Utensils className="w-16 h-16 mx-auto mb-6 animate-festival-float" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Grand Finale Dinner</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join us for an elegant evening of celebration, awards, and fine dining
          </p>
          <div className="mt-6 text-lg font-semibold">
            📅 September 14, 2025 • 🕕 6:00 PM • 📍 International Conference Centre, Ibadan
          </div>
        </div>
      </section>

      {/* Ticket Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Experience</h2>
            <p className="text-lg text-muted-foreground">Select the perfect ticket for an unforgettable evening</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {ticketOptions.map((ticket, index) => {
              const IconComponent = ticket.icon;
              return (
                <Card key={index} className={`relative ${ticket.popular ? 'border-festival-gold border-2 transform scale-105' : ''}`}>
                  {ticket.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-festival-gold text-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${ticket.popular ? 'bg-festival-gold' : 'bg-festival-green'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{ticket.type}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-festival-green">
                      {ticket.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {ticket.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-festival-green flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Purchase Form */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Dinner Tickets</CardTitle>
                <CardDescription>
                  Complete your purchase for the Grand Finale Dinner
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
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ticketType">Ticket Type *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose ticket type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular Table Seat - ₦20,000</SelectItem>
                          <SelectItem value="premium">Premium Seat - ₦100,000</SelectItem>
                          <SelectItem value="vip">VIP Table for 4 - ₦300,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of tickets" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Ticket</SelectItem>
                          <SelectItem value="2">2 Tickets</SelectItem>
                          <SelectItem value="3">3 Tickets</SelectItem>
                          <SelectItem value="4">4 Tickets</SelectItem>
                          <SelectItem value="5">5+ Tickets (Contact us)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-festival-gold/10 to-festival-green/10 p-6 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Dress Code & Event Details
                    </h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>Dress Code:</strong> Elegant Native Attire or Themed Costume (Made in Ibadan)</p>
                      <p><strong>Time:</strong> 6:00 PM - 11:00 PM</p>
                      <p><strong>Venue:</strong> International Conference Centre, Ibadan</p>
                      <p><strong>Includes:</strong> Dinner, Entertainment, Awards Ceremony, Networking</p>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="specialRequests">Special Dietary Requirements (Optional)</Label>
                    <Input id="specialRequests" placeholder="e.g., Vegetarian, Allergies, etc." />
                  </div>

                  {/* Total Calculation */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Total Amount</span>
                      <span className="text-2xl font-bold text-festival-green">₦0</span>
                    </div>
                    <Button type="submit" variant="festival-gold" size="lg" className="w-full">
                      <Utensils className="w-4 h-4 mr-2" />
                      Purchase Tickets
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      E-tickets with QR codes will be sent to your email after payment
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DinnerTicketPurchase;