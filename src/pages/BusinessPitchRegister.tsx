import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Trophy, Users, Star, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BusinessPitchRegister = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Submitted!",
      description: "Your business pitch registration has been received. You'll receive a confirmation email shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Trophy className="w-16 h-16 mx-auto mb-6 animate-festival-float" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Business Pitch Contest</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Pitch your business idea to industry experts and compete for funding opportunities
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Eligibility & Info */}
            <div className="md:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-festival-green" />
                    Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Ages 18-40</li>
                    <li>• Intending Business owners</li>
                    <li>• Small Business Owners</li>
                    <li>• Student Entrepreneurs</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-festival-gold" />
                    Prizes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 1st Place: ₦5,000,000 funding</li>
                    <li>• 2nd Place: ₦3,000,000 funding</li>
                    <li>• 3rd Place: ₦1,000,000 funding</li>
                    <li>• Mentorship opportunities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-festival-green" />
                    Entry Fee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-festival-green">₦15,000</p>
                  <p className="text-sm text-muted-foreground">One-time registration fee</p>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Register for Business Pitch Contest</CardTitle>
                  <CardDescription>
                    Fill out the form below to register for the competition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input id="fullName" placeholder="Enter your full name" required />
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
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input id="businessName" placeholder="Your business name" required />
                      </div>
                      <div>
                        <Label htmlFor="category">Business Category *</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="agriculture">Agriculture</SelectItem>
                            <SelectItem value="fashion">Fashion & Design</SelectItem>
                            <SelectItem value="food">Food & Beverages</SelectItem>
                            <SelectItem value="health">Health & Wellness</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="finance">Finance & Fintech</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Business Description *</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your business in 100 words max"
                        maxLength={100}
                        rows={4}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">Maximum 100 words</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessLogo">Business Logo/Product Image</Label>
                        <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-festival-green transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="personalPhoto">Personal Picture *</Label>
                        <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-festival-green transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold">Entry Fee</span>
                        <span className="text-2xl font-bold text-festival-green">₦15,000</span>
                      </div>
                      <Button type="submit" variant="festival" size="lg" className="w-full">
                        Register & Pay Entry Fee
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        You will be redirected to payment gateway after submission
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPitchRegister;