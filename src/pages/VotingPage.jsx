import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Vote,
  Trophy,
  Users,
  DollarSign,
  Star,
  Eye,
  Search,
  RefreshCw,
  Wifi,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const VotingPage = () => {
  const { toast } = useToast();

  const [nominees, setNominees] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState(null);
  const [selectedNomineeId, setSelectedNomineeId] = useState(null); // New state for nominee ID
  const [voteCount, setVoteCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSubmittingVote, setIsSubmittingVote] = useState(false); // New loading state for vote submission

  // Vote form state
  const [voteFormData, setVoteFormData] = useState({
    voterName: "",
    voterEmail: "",
    voterPhone: "",
    voteCount: 1,
  });

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        setLoading(true);
        setLoadingTimeout(false);

        // Set timeout to show network warning after 10 seconds
        const timeoutId = setTimeout(() => {
          setLoadingTimeout(true);
        }, 10000);

        const response = await fetch(
          "http://placid-002-site24.qtempurl.com/api/v1/nominee",
          {
            method: "GET",
            headers: {
              "X-API-KEY": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
            },
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Failed to fetch nominees: ${response.status}`);
        }

        const data = await response.json();
        const nomineesData = Array.isArray(data.data) ? data.data : [data.data];
        setNominees(nomineesData);
      } catch (error) {
        console.error("Error fetching nominees:", error);
        toast({
          title: "Loading Error",
          description: "Failed to load nominees. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        setLoadingTimeout(false);
      }
    };

    fetchNominees();
  }, [toast]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://placid-002-site24.qtempurl.com/api/v1/awardcategory",
          {
            headers: {
              "X-API-KEY": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
            },
          }
        );

        const result = await response.json();
        const categoryArray = Array.isArray(result?.data) ? result.data : [];
        const categoryNames = categoryArray.map((cat) => cat.name);
        setCategories(["All", ...categoryNames]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleVote = (nominee) => {
    setSelectedNominee(nominee);
    setSelectedNomineeId(nominee.id); // Store the nominee ID
    setVoteFormData({
      voterName: "",
      voterEmail: "",
      voterPhone: "",
      voteCount: 1,
    });
    setShowVoteForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoteFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateReferenceNumber = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `VOTE-${timestamp}-${random.toUpperCase()}`;
  };

  const handleVoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingVote(true);

    // Set timeout for slow network detection (10 seconds)
    const timeoutId = setTimeout(() => {
      toast({
        title: "Network Slow",
        description:
          "Connection is taking longer than usual. Please wait or refresh and try again.",
        variant: "destructive",
      });
    }, 10000);

    try {
      const payload = {
        nomineeId: selectedNomineeId,
        quantity: parseInt(voteFormData.voteCount),
        voterEmail: voteFormData.voterEmail,
        voterName: voteFormData.voterName,
        referenceNumber: generateReferenceNumber(),
      };

      const response = await fetch(
        "http://placid-002-site24.qtempurl.com/api/v1/castvote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
          },
          body: JSON.stringify(payload),
        }
      );

      // Clear timeout if request completes within 10 seconds
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Failed to cast vote: ${response.status}`
        );
      }

      const result = await response.json();

      toast({
        title: "Vote Submitted Successfully!",
        description: `Your ${voteFormData.voteCount} vote(s) for ${
          selectedNominee?.fullName
        } have been recorded. Total: ₦${voteFormData.voteCount * 50}`,
      });

      // Close modal and reset state
      setShowVoteForm(false);
      setSelectedNominee(null);
      setSelectedNomineeId(null);
      setVoteFormData({
        voterName: "",
        voterEmail: "",
        voterPhone: "",
        voteCount: 1,
      });
    } catch (error) {
      // Clear timeout in case of error
      clearTimeout(timeoutId);

      console.error("Error casting vote:", error);
      toast({
        title: "Vote Submission Failed",
        description:
          error.message || "Failed to submit vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingVote(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter nominees based on search and category
  const filteredNominees = nominees.filter((nominee) => {
    const matchesCategory =
      selectedCategory === "All" || nominee.category === selectedCategory;
    const matchesSearch = nominee.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Loading Skeleton Component
  const NomineeSkeleton = () => (
    <Card className="group">
      <CardHeader className="text-center">
        <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
        <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
        <Skeleton className="h-6 w-20 mx-auto" />
      </CardHeader>
      <CardContent className="text-center">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mx-auto mb-4" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Vote className="w-16 h-16 mx-auto mb-6 animate-festival-float" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Youth Excellence Awards
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Vote for outstanding young entrepreneurs making a difference in Oyo
            State
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 max-w-xl mx-auto">
            <p className="text-lg font-semibold mb-2">Voting Information</p>
            <p className="text-primary-foreground/90">
              ₦50 per vote • Secure payment • Instant notification to nominees
            </p>
          </div>
        </div>
      </section>

      {/* Voting Stats */}
      <section className="py-12 bg-festival-light-green/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-festival-green">
                {loading ? (
                  <Skeleton className="h-8 w-12 mx-auto" />
                ) : (
                  nominees.length
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Verified Nominees
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-festival-green">
                {loading ? (
                  <Skeleton className="h-8 w-16 mx-auto" />
                ) : (
                  nominees
                    .reduce((sum, n) => sum + (n.votes || 0), 0)
                    .toLocaleString()
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Votes Cast
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-festival-green">
                {loading ? (
                  <Skeleton className="h-8 w-8 mx-auto" />
                ) : (
                  categories.length - 1
                )}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-festival-green">₦50</div>
              <div className="text-sm text-muted-foreground">Per Vote</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search nominees by name..."
                value={searchTerm}
                style={{ color: "black" }}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-xl focus:outline-none focus:ring-2 focus:ring-festival-gold placeholder:text-gray-500 text-white"
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px] bg-background/10 border-festival-green/30 text-white px-10">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Loading Timeout Warning */}
      {loadingTimeout && loading && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Card className="max-w-md mx-auto border-orange-200 bg-orange-50">
              <CardContent className="flex items-center gap-4 p-6">
                <Wifi className="w-8 h-8 text-orange-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800">
                    Slow Network Connection
                  </h3>
                  <p className="text-sm text-orange-600 mb-3">
                    Loading is taking longer than usual. Your network connection
                    might be slow.
                  </p>
                  <Button
                    onClick={handleRefresh}
                    size="sm"
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-100"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Nominees Grid */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Show loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <NomineeSkeleton key={index} />
              ))
            ) : filteredNominees.length === 0 ? (
              // Show no results message
              <div className="col-span-full">
                <Card className="max-w-md mx-auto text-center border-dashed">
                  <CardContent className="p-8">
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                      No Nominees Found
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {searchTerm || selectedCategory !== "All" ? (
                        <>
                          No nominees match your search criteria.
                          <br />
                          Try adjusting your search or category filter.
                        </>
                      ) : (
                        "No nominees are currently available."
                      )}
                    </p>
                    {(searchTerm || selectedCategory !== "All") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("All");
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Show nominees
              filteredNominees.map((nominee) => (
                <Card
                  key={nominee.id}
                  className="group hover:shadow-elegant transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-festival-light-green rounded-full flex items-center justify-center mx-auto mb-4 text-4xl group-hover:scale-110 transition-transform overflow-hidden">
                      {nominee.picture ? (
                        <img
                          src={nominee.picture}
                          alt={nominee.fullName}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-festival-green font-bold">
                          {getInitials(nominee.fullName)}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-festival-green transition-colors">
                      {nominee.fullName}
                    </CardTitle>
                    <CardDescription className="text-festival-green font-semibold">
                      {nominee.companyName}
                    </CardDescription>
                    <Badge variant="outline" className="mx-auto">
                      {nominee.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {nominee.biography}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="festival-outline"
                        size="sm"
                        className="text-xs"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Profile
                      </Button>
                      <Button
                        variant="festival"
                        size="sm"
                        onClick={() => handleVote(nominee)}
                        className="text-xs"
                      >
                        <Vote className="w-3 h-3 mr-1" />
                        Vote Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Voting Form Modal */}
        {showVoteForm && selectedNominee && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Complete Your Vote</CardTitle>
                <CardDescription>
                  Voting for {selectedNominee?.fullName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVoteSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="voterName">Your Name </Label>
                    <Input
                      id="voterName"
                      name="voterName"
                      value={voteFormData.voterName}
                      onChange={handleInputChange}
                      disabled={isSubmittingVote}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="voterEmail">Email Address </Label>
                    <Input
                      id="voterEmail"
                      name="voterEmail"
                      type="email"
                      value={voteFormData.voterEmail}
                      onChange={handleInputChange}
                      disabled={isSubmittingVote}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="voterPhone">Phone Number </Label>
                    <Input
                      id="voterPhone"
                      name="voterPhone"
                      type="tel"
                      value={voteFormData.voterPhone}
                      onChange={handleInputChange}
                      disabled={isSubmittingVote}
                    />
                  </div>
                  <div>
                    <Label htmlFor="voteCount">Number of Votes </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="voteCount"
                        name="voteCount"
                        type="number"
                        value={voteFormData.voteCount}
                        onChange={handleInputChange}
                        min="1"
                        className="flex-1"
                        disabled={isSubmittingVote}
                        required
                      />
                      <span className="text-sm text-muted-foreground">
                        × ₦50
                      </span>
                    </div>
                  </div>
                  <div className="bg-festival-light-green/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-xl font-bold text-festival-green">
                        ₦{voteFormData.voteCount * 50}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowVoteForm(false)}
                      className="flex-1"
                      disabled={isSubmittingVote}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="festival"
                      className="flex-1"
                      disabled={isSubmittingVote}
                    >
                      {isSubmittingVote ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Pay & Vote"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
};

export default VotingPage;
