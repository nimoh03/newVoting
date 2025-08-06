import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Building, Upload, MapPin, Check, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VendorStandBooking = () => {
  const { toast } = useToast();

  const boothOptions = [
    {
      type: "Standard Booth",
      price: "₦150,000",
      features: [
        "3m x 3m space",
        "Basic lighting",
        "1 table & 2 chairs",
        "Power outlet",
        "Booth signage"
      ],
      recommended: false
    },
    {
      type: "Premium Booth",
      price: "₦300,000",
      features: [
        "5m x 5m space",
        "Premium lighting",
        "2 tables & 4 chairs",
        "Multiple power outlets",
        "Large booth signage",
        "Storage area",
        "Priority location"
      ],
      recommended: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booth Booking Submitted!",
      description: "Your exhibition stand booking has been received. You'll receive confirmation and booth assignment shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Building className="w-16 h-16 mx-auto mb-6 animate-festival-float" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Exhibition Stand Booking</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Showcase your products and services to thousands of festival visitors
          </p>
        </div>
      </section>

      {/* Booth Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Booth Type</h2>
            <p className="text-lg text-muted-foreground">Select the perfect space for your business</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {boothOptions.map((booth, index) => (
              <Card key={index} className={`relative ${booth.recommended ? 'border-festival-green border-2' : ''}`}>
                {booth.recommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-festival-gold text-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Recommended
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{booth.type}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-festival-green">
                    {booth.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {booth.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-festival-green" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Registration Form */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Book Your Exhibition Stand</CardTitle>
                <CardDescription>
                  Complete the form below to reserve your booth space
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input id="businessName" placeholder="Your business name" required />
                  </div>

                  <div>
                    <Label htmlFor="businessCategory">Business Category *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">Fashion & Clothing</SelectItem>
                        <SelectItem value="food">Food & Beverages</SelectItem>
                        <SelectItem value="technology">Technology & Electronics</SelectItem>
                        <SelectItem value="cosmetics">Beauty & Cosmetics</SelectItem>
                        <SelectItem value="crafts">Arts & Crafts</SelectItem>
                        <SelectItem value="agriculture">Agriculture & Farming</SelectItem>
                        <SelectItem value="health">Health & Wellness</SelectItem>
                        <SelectItem value="education">Education & Training</SelectItem>
                        <SelectItem value="finance">Financial Services</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Person *</Label>
                      <Input id="contactName" placeholder="Full name" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="+234 800 000 0000" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instagram">Instagram Handle</Label>
                      <Input id="instagram" placeholder="@yourbusiness" />
                    </div>
                    <div>
                      <Label htmlFor="tiktok">TikTok Handle</Label>
                      <Input id="tiktok" placeholder="@yourbusiness" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="boothType">Preferred Booth Type *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your booth type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Booth - ₦150,000</SelectItem>
                        <SelectItem value="premium">Premium Booth - ₦300,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brandLogo">Brand Logo</Label>
                      <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-festival-green transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Upload brand logo</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="productImage">Product Sample Image</Label>
                      <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-festival-green transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Upload product image</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="personalPhoto">Personal Picture *</Label>
                    <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-festival-green transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload your photo</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <Button type="submit" variant="festival" size="lg" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Book Stand & Make Payment
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Booth number will be assigned after payment confirmation
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

export default VendorStandBooking;