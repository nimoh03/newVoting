import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Mail, Phone, Calendar, DollarSign, Eye, Download } from "lucide-react";

const NomineeDashboard = () => {
  // Mock data - in real implementation, this would come from authenticated user's data
  const nomineeData = {
    id: 1,
    name: "Adebayo Ogundimu",
    business: "TechNova Solutions",
    category: "Technology",
    bio: "Innovative fintech solutions for rural banking access",
    email: "adebayo@technova.com",
    phone: "+234 808 123 4567",
    registrationDate: "2025-01-15",
    totalVotes: 1247,
    totalEarnings: 62350, // ₦50 per vote
    rank: 2
  };

  const recentVotes = [
    { id: 1, voterName: "Kemi Adeyemi", voterEmail: "kemi.a@email.com", voterPhone: "+234 801 234 5678", votes: 5, amount: 250, date: "2025-01-20 14:30" },
    { id: 2, voterName: "Tunde Bakare", voterEmail: "tunde.b@email.com", voterPhone: "+234 802 345 6789", votes: 2, amount: 100, date: "2025-01-20 12:15" },
    { id: 3, voterName: "Funmi Olarewaju", voterEmail: "funmi.o@email.com", voterPhone: "+234 803 456 7890", votes: 10, amount: 500, date: "2025-01-20 09:45" },
    { id: 4, voterName: "Samuel Adebisi", voterEmail: "samuel.a@email.com", voterPhone: "+234 804 567 8901", votes: 1, amount: 50, date: "2025-01-19 16:20" },
    { id: 5, voterName: "Aisha Mohammed", voterEmail: "aisha.m@email.com", voterPhone: "+234 805 678 9012", votes: 3, amount: 150, date: "2025-01-19 11:30" },
  ];

  const voteStats = [
    { period: "Today", votes: 18, amount: 900 },
    { period: "This Week", votes: 89, amount: 4450 },
    { period: "This Month", votes: 247, amount: 12350 },
    { period: "All Time", votes: 1247, amount: 62350 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="py-12 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-2xl bg-primary-foreground text-festival-green">
                {nomineeData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{nomineeData.name}</h1>
              <p className="text-xl text-primary-foreground/90 mb-2">{nomineeData.business}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Badge className="bg-primary-foreground text-festival-green">{nomineeData.category}</Badge>
                <Badge className="bg-festival-gold text-foreground">Rank #{nomineeData.rank}</Badge>
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                  {nomineeData.totalVotes} votes
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">₦{nomineeData.totalEarnings.toLocaleString()}</div>
              <div className="text-primary-foreground/80">Total Earnings Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {voteStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-festival-green">{stat.votes}</div>
                  <div className="text-xs text-muted-foreground mb-1">{stat.period} Votes</div>
                  <div className="text-sm font-semibold">₦{stat.amount.toLocaleString()}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="votes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="votes">Recent Votes</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="votes">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-festival-green" />
                        Recent Votes
                      </CardTitle>
                      <CardDescription>People who have voted for you</CardDescription>
                    </div>
                    <Button variant="festival-outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentVotes.map((vote) => (
                      <div key={vote.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-festival-light-green/20 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-festival-green text-primary-foreground">
                                {vote.voterName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">{vote.voterName}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {vote.voterEmail}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {vote.voterPhone}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-festival-green">{vote.votes} votes</div>
                          <div className="text-sm text-muted-foreground">₦{vote.amount}</div>
                          <div className="text-xs text-muted-foreground">{vote.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-festival-green" />
                      Vote Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Daily Average</span>
                        <span className="font-semibold">12.7 votes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Peak Day</span>
                        <span className="font-semibold">Jan 18 (45 votes)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Growth Rate</span>
                        <span className="font-semibold text-festival-green">+23%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-festival-green" />
                      Revenue Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Average per Vote</span>
                        <span className="font-semibold">₦50</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Largest Single Vote</span>
                        <span className="font-semibold">₦2,500 (50 votes)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Monthly Growth</span>
                        <span className="font-semibold text-festival-green">+₦12,350</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Your registered details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Business Name</label>
                        <div className="text-lg">{nomineeData.business}</div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Category</label>
                        <div className="text-lg">{nomineeData.category}</div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Email</label>
                        <div className="text-lg">{nomineeData.email}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Phone</label>
                        <div className="text-lg">{nomineeData.phone}</div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Registration Date</label>
                        <div className="text-lg flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {nomineeData.registrationDate}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">Bio</label>
                        <div className="text-lg">{nomineeData.bio}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default NomineeDashboard;