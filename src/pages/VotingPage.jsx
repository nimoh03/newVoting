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
  CreditCard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const VotingPage = () => {
  const { toast } = useToast();

  const [nominees, setNominees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState(null);
  const [selectedNomineeId, setSelectedNomineeId] = useState(null);
  const [selectedNomineeCategory, setSelectedNomineeCategory] = useState(null); // Added this
  const [voteCount, setVoteCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);

  // Vote form state
  const [voteFormData, setVoteFormData] = useState({
    voterName: "",
    voterEmail: "",
    voterPhone: "",
    voteCount: 1,
  });

  // Flutterwave configuration
  const config = {
    public_key:
      import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY ||
      "FLWPUBK_TEST-1e0d20b98a0a662d68abd35648c10ec3-X",
    tx_ref: "",
    amount: 0,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "",
      phone_number: "",
      name: "",
    },
    customizations: {
      title: "Youth Excellence Awards Voting",
      description: `Vote for ${selectedNominee?.fullName || "Nominee"}`,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  // const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        setLoading(true);
        setLoadingTimeout(false);

        // Set timeout to show network warning after 30 seconds (increased from 10 seconds)
        const timeoutId = setTimeout(() => {
          setLoadingTimeout(true);
        }, 120000);

        const response = await fetch(
          "https://api.ibadanmarketsquare.ng/api/v1/nominee?pageNumber=1&pageSize=1000",
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
        "https://api.ibadanmarketsquare.ng/api/v1/businesscategory",
        {
          headers: {
            "X-API-KEY": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
          },
        }
      );

      const result = await response.json();
      const categoryArray = Array.isArray(result?.data) ? result.data : [];
      
      // Filter categories where award equals true
      const awardCategories = categoryArray.filter(cat => cat.award === true);
      
      // Extract category names from filtered categories
      const categoryNames = awardCategories.map((cat) => cat.name);
      
      setCategories(["All", ...categoryNames]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  fetchCategories();
}, []);

  // Updated handleVote function to capture category
  const handleVote = (nominee) => {
    setSelectedNominee(nominee);
    setSelectedNomineeId(nominee.id);
    setSelectedNomineeCategory(nominee.category); // Capture the category name
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

  const handleVoteSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (
      !voteFormData.voterName ||
      !voteFormData.voterEmail ||
      !voteFormData.voteCount
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const txRef = generateReferenceNumber();
    const totalAmount = parseInt(voteFormData.voteCount) * 50;

    // ✅ Build config here with updated amount
    const paymentConfig = {
      public_key:
        import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK_TEST-xxxx",
      tx_ref: txRef,
      amount: totalAmount,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: voteFormData.voterEmail,
        phone_number: voteFormData.voterPhone || "",
        name: voteFormData.voterName,
      },
      customizations: {
        title: "Youth Excellence Awards Voting",
        description: `${voteFormData.voteCount} vote(s) for ${selectedNominee?.fullName}`,
        logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
      },
    };

    // ✅ Create payment function now
    const startPayment = useFlutterwave(paymentConfig);

    startPayment({
      callback: async (response) => {
        closePaymentModal();

        if (response.status === "successful") {
          await submitVoteToAPI({
            transactionId: response.transaction_id, // Flutterwave transaction ID
            txRef: response.tx_ref, // Your generated reference number
          });
        } else {
          toast({
            title: "Payment Failed",
            description: "Payment was not successful. Please try again.",
            variant: "destructive",
          });
        }
      },
      onClose: () => {
        toast({
          title: "Payment Cancelled",
          description: "Payment was cancelled. Your vote was not recorded.",
          variant: "destructive",
        });
      },
    });
  };

// Updated submitVoteToAPI function to include categoryName
const submitVoteToAPI = async ({ transactionId, txRef }) => {
  setIsSubmittingVote(true);

  // Increased timeout for vote submission to 20 seconds (from 10 seconds)
  const timeoutId = setTimeout(() => {
    toast({
      title: "Network Slow",
      description:
        "Connection is taking longer than usual. Please wait or refresh and try again.",
      variant: "destructive",
    });
  }, 120000);

  try {
    const payload = {
      nomineeId: selectedNomineeId,
      quantity: parseInt(voteFormData.voteCount),
      voterEmail: voteFormData.voterEmail,
      voterName: voteFormData.voterName,
      referenceNumber: txRef, // Your own generated reference
      flutterwaveTransactionId: transactionId, // Add this back - your API might need it
      categoryName: selectedNomineeCategory // Added the category name here
    };


    const response = await fetch(
      "https://api.ibadanmarketsquare.ng/api/v1/castvote",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
        },
        body: JSON.stringify(payload),
      }
    );

    clearTimeout(timeoutId);

    // Enhanced error logging
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Vote submission failed:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        payload
      });
      
      throw new Error(
        errorData.message || 
        errorData.error || 
        `Failed to cast vote: ${response.status} ${response.statusText}`
      );
    }

    const successData = await response.json();
   
    toast({
      title: "Vote Submitted Successfully!",
      description: `Your ${voteFormData.voteCount} vote(s) for ${
        selectedNominee?.fullName
      } have been recorded. Total: ₦${voteFormData.voteCount * 50}`,
    });

    setShowVoteForm(false);
    setSelectedNominee(null);
    setSelectedNomineeId(null);
    setSelectedNomineeCategory(null); // Reset category
    setVoteFormData({
      voterName: "",
      voterEmail: "",
      voterPhone: "",
      voteCount: 1,
    });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Vote submission error:', error); // Debug log
    
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
      selectedCategory === "" ||
      selectedCategory === "All" ||
      nominee.category === selectedCategory;
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
              ₦50 per vote • Secure payment via Flutterwave • Instant
              notification to nominees
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
              <SelectValue placeholder="Select Category to View" />
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
                      {searchTerm ||
                      (selectedCategory && selectedCategory !== "All") ? (
                        <>
                          No nominees match your search criteria.
                          <br />
                          Try adjusting your search or category filter.
                        </>
                      ) : (
                        "No nominees are currently available."
                      )}
                    </p>
                    {(searchTerm ||
                      (selectedCategory && selectedCategory !== "All")) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("");
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
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Complete Your Vote
                </CardTitle>
                <CardDescription>
                  Voting for {selectedNominee?.fullName}
                  <br />
                  <span className="text-xs text-muted-foreground">
                    Category: {selectedNomineeCategory}
                  </span>
                  <br />
                  <span className="text-xs text-muted-foreground">
                    Payment will be processed securely via Flutterwave
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVoteSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="voterName">
                      Your Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="voterName"
                      name="voterName"
                      value={voteFormData.voterName}
                      onChange={handleInputChange}
                      disabled={isSubmittingVote}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="voterEmail">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="voterEmail"
                      name="voterEmail"
                      type="email"
                      value={voteFormData.voterEmail}
                      onChange={handleInputChange}
                      disabled={isSubmittingVote}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="voterPhone">Phone Number</Label>
                    <Input
                      id="voterPhone"
                      name="voterPhone"
                      type="tel"
                      value={voteFormData.voterPhone}
                      onChange={handleInputChange}
                      disabled={isSubmittingVote}
                      placeholder="Enter your phone number (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="voteCount">
                      Number of Votes <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="voteCount"
                        name="voteCount"
                        type="number"
                        value={voteFormData.voteCount}
                        onChange={handleInputChange}
                        min="1"
                        // max="100"
                        className="flex-1"
                        disabled={isSubmittingVote}
                        required
                      />
                      <span className="text-sm text-muted-foreground">
                        × ₦50
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum: 1 vote
                    </p>
                  </div>
                  <div className="bg-festival-light-green/20 border border-festival-green/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-2xl font-bold text-festival-green">
                        ₦{(voteFormData.voteCount * 50).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Votes:</span>
                        <span>{voteFormData.voteCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate per vote:</span>
                        <span>₦50</span>
                      </div>
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
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay ₦{(voteFormData.voteCount * 50).toLocaleString()}
                        </>
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