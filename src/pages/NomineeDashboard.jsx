import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Users,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Eye,
  Download,
  Loader2,
} from "lucide-react";

import { useAuth } from "../../context/Authcontext";

const NomineeDashboard = () => {
  const [nomineeData, setNomineeData] = useState(null);
  const [recentVotes, setRecentVotes] = useState([]);
  const [voteStats, setVoteStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth();

  const API_BASE_URL = "https://api.ibadanmarketsquare.ng/api/v1";
  

  const fetchNomineeData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/nominee/id?Id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH`,
          // Alternative header format if the above doesn't work:
          "X-API-Key": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch nominee data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Update state with API data
      setNomineeData({
        id: data.data.id || userId,
        name: data.name || data.data.fullName || "Unknown Nominee",
        business:
          data.data.companyName ||
          data.business ||
          data.businessName ||
          "Business Name Not Available",
        category:
          data.data.category || data.businessCategory || "Uncategorized",
        bio: data.data.bio || data.description || "No bio available",
        email: data.data.emailAddress || "Email not provided",
        phone:
          data.data.phoneNumber || data.phoneNumber || "Phone not provided",
        registrationDate:
          data.registrationDate ||
          data.createdAt ||
          new Date().toISOString().split("T")[0],
        totalVotes: data.totalVotes || data.votes || 0,
        totalEarnings: (data.totalVotes || data.votes || 0) * 50, // ₦50 per vote
        rank: data.rank || data.position || 0,
        totalVoters: data.totalVoters || data.uniqueVoters || 0,
      });

      // Set recent votes (adapt field names based on API response)
      setRecentVotes(data.recentVotes || data.votes || []);

      // Calculate vote stats
      const totalVotes = data.totalVotes || data.votes || 0;
      const totalAmount = totalVotes * 50;

      setVoteStats([
        {
          period: "Today",
          votes: data.todayVotes || 0,
          amount: (data.todayVotes || 0) * 50,
        },
        {
          period: "This Week",
          votes: data.weeklyVotes || 0,
          amount: (data.weeklyVotes || 0) * 50,
        },
        {
          period: "This Month",
          votes: data.monthlyVotes || 0,
          amount: (data.monthlyVotes || 0) * 50,
        },
        {
          period: "All Time",
          votes: totalVotes,
          amount: totalAmount,
        },
      ]);
    } catch (err) {
      console.error("Error fetching nominee data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNomineeData();
  }, [userId]);

  const handleRetry = () => {
    fetchNomineeData();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const formatVoteDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-festival-green" />
            <p className="text-lg text-muted-foreground">
              Loading your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <Eye className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">Failed to Load Dashboard</p>
            </div>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={handleRetry} variant="festival">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!nomineeData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-lg text-muted-foreground">No data available</p>
        </div>
      </div>
    );
  }

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
                {nomineeData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {nomineeData.name}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-2">
                {nomineeData.business}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Badge className="bg-primary-foreground text-festival-green text-black">
                  {nomineeData.category}
                </Badge>
                {nomineeData.rank > 0 && (
                  <Badge className="bg-festival-gold text-foreground">
                    Rank #{nomineeData.rank}
                  </Badge>
                )}
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                  {nomineeData.totalVotes} votes
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {nomineeData.totalVoters}
              </div>
              <div className="text-primary-foreground/80">
                Total Number of Voters
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      {/* <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {voteStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-festival-green">
                    {stat.votes}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {stat.period} Votes
                  </div>
                  <div className="text-sm font-semibold">
                    ₦{stat.amount.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="votes" className="w-full">
            <TabsList className="flex w-full max-w-md mx-auto mb-8">
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
                      <CardDescription>
                        People who have voted for you
                      </CardDescription>
                    </div>
                    <Button variant="festival-outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentVotes.length > 0 ? (
                    <div className="space-y-4">
                      {recentVotes.map((vote, index) => (
                        <div
                          key={vote.id || index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-festival-light-green/20 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-festival-green text-primary-foreground">
                                  {(vote.voterName || vote.name || "Anonymous")
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">
                                  {vote.voterName ||
                                    vote.name ||
                                    "Anonymous Voter"}
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {vote.voterEmail ||
                                      vote.email ||
                                      "Email not provided"}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {vote.voterPhone ||
                                      vote.phone ||
                                      "Phone not provided"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-festival-green">
                              {vote.votes || vote.voteCount || 1} votes
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ₦
                              {(
                                (vote.votes || vote.voteCount || 1) * 50
                              ).toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatVoteDate(vote.date || vote.createdAt)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No votes yet</p>
                    </div>
                  )}
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
                        <span className="font-semibold">
                          {nomineeData.totalVotes > 0
                            ? (nomineeData.totalVotes / 30).toFixed(1)
                            : "0"}{" "}
                          votes
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total Votes</span>
                        <span className="font-semibold">
                          {nomineeData.totalVotes} votes
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Current Rank</span>
                        <span className="font-semibold text-festival-green">
                          #{nomineeData.rank || "Unranked"}
                        </span>
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
                        <span>Rate per Vote</span>
                        <span className="font-semibold">₦50</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total Earnings</span>
                        <span className="font-semibold">
                          ₦{nomineeData.totalEarnings.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Unique Voters</span>
                        <span className="font-semibold text-festival-green">
                          {nomineeData.totalVoters}
                        </span>
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
                        <label className="text-sm font-semibold text-muted-foreground">
                          Business Name
                        </label>
                        <div className="text-lg">{nomineeData.business}</div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">
                          Category
                        </label>
                        <div className="text-lg">{nomineeData.category}</div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">
                          Email
                        </label>
                        <div className="text-lg">{nomineeData.email}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">
                          Phone
                        </label>
                        <div className="text-lg">{nomineeData.phone}</div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">
                          Registration Date
                        </label>
                        <div className="text-lg flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {formatDate(nomineeData.registrationDate)}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground">
                          Bio
                        </label>
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
