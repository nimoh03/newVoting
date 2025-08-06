import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  DollarSign, 
  Trophy, 
  Building, 
  Calendar, 
  Settings, 
  UserCheck, 
  UserX, 
  Eye,
  Edit,
  Trash2,
  Download,
  Plus,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SuperAdminDashboard = () => {
  const { toast } = useToast();

  // Mock data for admin dashboard
  const dashboardStats = {
    totalNominees: 47,
    verifiedNominees: 32,
    pendingNominees: 15,
    totalVotes: 8742,
    totalRevenue: 437100,
    totalVoters: 1653,
    businessPitchRegistrations: 89,
    vendorStandBookings: 34,
    freePassRegistrations: 2157,
    dinnerTicketSales: 167
  };

  const nominees = [
    { id: 1, name: "Adebayo Ogundimu", business: "TechNova Solutions", category: "Technology", votes: 1247, status: "verified", email: "adebayo@technova.com" },
    { id: 2, name: "Fatima Abdullahi", business: "GreenHarvest Farms", category: "Agriculture", votes: 892, status: "verified", email: "fatima@greenharvest.com" },
    { id: 3, name: "Kemi Adeola", business: "Afrocentric Fashion", category: "Fashion", votes: 1156, status: "verified", email: "kemi@afrocentric.com" },
    { id: 4, name: "Ibrahim Lawal", business: "EduStream Academy", category: "Education", votes: 743, status: "pending", email: "ibrahim@edustream.com" },
    { id: 5, name: "Chiamaka Okonkwo", business: "HealthTech Diagnostics", category: "Healthcare", votes: 934, status: "verified", email: "chiamaka@healthtech.com" },
    { id: 6, name: "Yusuf Mohammed", business: "Solar Energy Solutions", category: "Energy", votes: 1089, status: "pending", email: "yusuf@solarenergy.com" },
  ];

  const recentVotes = [
    { id: 1, voterName: "Kemi Adeyemi", nomineeName: "Adebayo Ogundimu", votes: 5, amount: 250, date: "2025-01-20 14:30" },
    { id: 2, voterName: "Tunde Bakare", nomineeName: "Fatima Abdullahi", votes: 2, amount: 100, date: "2025-01-20 12:15" },
    { id: 3, voterName: "Funmi Olarewaju", nomineeName: "Kemi Adeola", votes: 10, amount: 500, date: "2025-01-20 09:45" },
    { id: 4, voterName: "Samuel Adebisi", nomineeName: "Ibrahim Lawal", votes: 1, amount: 50, date: "2025-01-19 16:20" },
    { id: 5, voterName: "Aisha Mohammed", nomineeName: "Chiamaka Okonkwo", votes: 3, amount: 150, date: "2025-01-19 11:30" },
  ];

  const handleNomineeAction = (action: string, nomineeName: string) => {
    toast({
      title: `Nominee ${action}`,
      description: `${nomineeName} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="py-12 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Super Admin Dashboard</h1>
              <p className="text-xl text-primary-foreground/90">
                Oyo State Youth and Business Festival 2025
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">₦{dashboardStats.totalRevenue.toLocaleString()}</div>
              <div className="text-primary-foreground/80">Total Revenue</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <Users className="w-8 h-8 mx-auto mb-2 text-festival-green" />
                <div className="text-2xl font-bold">{dashboardStats.totalNominees}</div>
                <div className="text-xs text-muted-foreground">Total Nominees</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-festival-gold" />
                <div className="text-2xl font-bold">{dashboardStats.totalVotes.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Votes</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-festival-emerald" />
                <div className="text-2xl font-bold">₦{dashboardStats.totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Revenue</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <Building className="w-8 h-8 mx-auto mb-2 text-festival-green" />
                <div className="text-2xl font-bold">{dashboardStats.businessPitchRegistrations}</div>
                <div className="text-xs text-muted-foreground">Pitch Registrations</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-festival-gold" />
                <div className="text-2xl font-bold">{dashboardStats.freePassRegistrations.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Free Passes</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="nominees" className="w-full">
            <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="nominees">Nominees</TabsTrigger>
              <TabsTrigger value="votes">Votes</TabsTrigger>
              <TabsTrigger value="registrations">Registrations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="nominees">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-festival-green" />
                        Nominee Management
                      </CardTitle>
                      <CardDescription>Manage nominee registrations and verification</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="festival-outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Nominee
                      </Button>
                      <Button variant="festival-outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input placeholder="Search nominees..." className="pl-10" />
                    </div>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    {nominees.map((nominee) => (
                      <div key={nominee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-festival-light-green/20 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-festival-green text-primary-foreground">
                              {nominee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{nominee.name}</span>
                              <Badge variant={nominee.status === 'verified' ? 'default' : 'secondary'}>
                                {nominee.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {nominee.business} • {nominee.category}
                            </div>
                            <div className="text-xs text-muted-foreground">{nominee.email}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-festival-green">{nominee.votes} votes</div>
                            <div className="text-sm text-muted-foreground">₦{nominee.votes * 50}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          {nominee.status === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleNomineeAction('Verified', nominee.name)}
                            >
                              <UserCheck className="w-4 h-4 text-festival-green" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleNomineeAction('Rejected', nominee.name)}
                          >
                            <UserX className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="votes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-festival-green" />
                    Vote Monitoring
                  </CardTitle>
                  <CardDescription>Real-time vote tracking and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentVotes.map((vote) => (
                      <div key={vote.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold">{vote.voterName}</div>
                          <div className="text-sm text-muted-foreground">
                            Voted for {vote.nomineeName}
                          </div>
                          <div className="text-xs text-muted-foreground">{vote.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-festival-green">{vote.votes} votes</div>
                          <div className="text-sm text-muted-foreground">₦{vote.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="registrations">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Registrations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Business Pitch Contest</span>
                      <span className="font-semibold">{dashboardStats.businessPitchRegistrations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Vendor Stand Bookings</span>
                      <span className="font-semibold">{dashboardStats.vendorStandBookings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Free Pass Registrations</span>
                      <span className="font-semibold">{dashboardStats.freePassRegistrations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Dinner Ticket Sales</span>
                      <span className="font-semibold">{dashboardStats.dinnerTicketSales}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Voting Revenue</span>
                      <span className="font-semibold">₦{dashboardStats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Business Pitch Fees</span>
                      <span className="font-semibold">₦{(dashboardStats.businessPitchRegistrations * 15000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Vendor Stand Revenue</span>
                      <span className="font-semibold">₦{(dashboardStats.vendorStandBookings * 200000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Dinner Ticket Sales</span>
                      <span className="font-semibold">₦{(dashboardStats.dinnerTicketSales * 50000).toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {nominees.slice(0, 3).map((nominee, index) => (
                        <div key={nominee.id} className="flex items-center gap-3">
                          <Badge className={index === 0 ? 'bg-festival-gold' : 'bg-festival-green'}>
                            #{index + 1}
                          </Badge>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{nominee.name}</div>
                            <div className="text-xs text-muted-foreground">{nominee.votes} votes</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Technology</span>
                        <span>32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Agriculture</span>
                        <span>18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fashion</span>
                        <span>15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Others</span>
                        <span>35%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Server Status</span>
                        <Badge className="bg-festival-green">Online</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Payment Gateway</span>
                        <Badge className="bg-festival-green">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Email Service</span>
                        <Badge className="bg-festival-green">Running</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-festival-green" />
                    System Settings
                  </CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Voting Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Vote Price</span>
                          <Input className="w-32" value="₦50" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Maximum Votes per Transaction</span>
                          <Input className="w-32" value="100" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Event Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Voting End Date</span>
                          <Input type="date" className="w-48" value="2025-09-13" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Auto-approve Nominees</span>
                          <Button variant="outline" size="sm">Toggle</Button>
                        </div>
                      </div>
                    </div>

                    <Button variant="festival" className="w-full">
                      Save Settings
                    </Button>
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

export default SuperAdminDashboard;