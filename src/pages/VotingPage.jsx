import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Vote, Trophy, Users, DollarSign, Star, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const VotingPage = () => {
  const { toast } = useToast();

  const [nominees, setNominees] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [selectedNominee, setSelectedNominee] = useState(null);
  const [voteCount, setVoteCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchNominees = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://placid-002-site24.qtempurl.com/api/v1/nominee', {
          method: 'GET',
          headers: {
            'X-API-KEY': 'H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch nominees: ${response.status}`);
        }

        const data = await response.json();
        const nomineesData = Array.isArray(data.data) ? data.data : [data.data];
        setNominees(nomineesData);
      } catch (error) {
        console.error('Error fetching nominees:', error);
        toast({
          title: "Loading Error",
          description: "Failed to load nominees. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNominees();
  }, [toast]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://placid-002-site24.qtempurl.com/api/v1/awardcategory", {
        headers: {
          "X-API-KEY": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
        },
      });

      const result = await response.json();

      // Safely check the structure of result
      const categoryArray = Array.isArray(result?.data) ? result.data : [];

      const categoryNames = categoryArray.map((cat) => cat.name);
      setCategories(["All", ...categoryNames]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  fetchCategories();
}, []);

  const handleVote = (nomineeId) => {
    setSelectedNominee(nomineeId);
    setShowVoteForm(true);
  };

  const handleVoteSubmit = (e) => {
    e.preventDefault();
    const nominee = nominees.find(n => n.id === selectedNominee);
    toast({
      title: "Vote Submitted!",
      description: `Your ${voteCount} vote(s) for ${nominee?.fullName} have been recorded. Total: ₦${voteCount * 50}`,
    });
    setShowVoteForm(false);
    setSelectedNominee(null);
    setVoteCount(1);
  };

  const getInitials = (name) => {
    return name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Vote className="w-16 h-16 mx-auto mb-6 animate-festival-float" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Youth Excellence Awards</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Vote for outstanding young entrepreneurs making a difference in Oyo State
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 max-w-xl mx-auto">
            <p className="text-lg font-semibold mb-2">Voting Information</p>
            <p className="text-primary-foreground/90">₦50 per vote • Secure payment • Instant notification to nominees</p>
          </div>
        </div>
      </section>

      {/* Voting Stats */}
      <section className="py-12 bg-festival-light-green/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-festival-green">{nominees.length}</div>
              <div className="text-sm text-muted-foreground">Verified Nominees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-festival-green">{nominees.reduce((sum, n) => sum + n.votes, 0).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Votes Cast</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-festival-green">{categories.length - 1}</div>
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
            <input
              type="text"
              placeholder="Search nominees by name..."
              value={searchTerm}
              style={{color : 'black'}}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-xl focus:outline-none focus:ring-2 focus:ring-festival-gold placeholder:text-gray-500"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant="outline"
                className={`cursor-pointer px-4 py-2 transition-colors ${
                  selectedCategory === category
                    ? 'bg-festival-green text-background'
                    : 'hover:bg-festival-green/20 text-white'
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Nominees Grid */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nominees
              .filter((nominee) => {
                const matchesCategory = selectedCategory === 'All' || nominee.category === selectedCategory;
                const matchesSearch = nominee.fullName.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesCategory && matchesSearch;
              })
              .map((nominee) => (
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
                      <Button variant="festival-outline" size="sm" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        View Profile
                      </Button>
                      <Button
                        variant="festival"
                        size="sm"
                        onClick={() => handleVote(nominee.id)}
                        className="text-xs"
                      >
                        <Vote className="w-3 h-3 mr-1" />
                        Vote Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
          </div>


          {/* Voting Form Modal */}
          {showVoteForm && selectedNominee && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Complete Your Vote</CardTitle>
                  <CardDescription>
                    Voting for {nominees.find(n => n.id === selectedNominee)?.fullName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVoteSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="voterName">Your Name *</Label>
                      <Input id="voterName" required />
                    </div>
                    <div>
                      <Label htmlFor="voterEmail">Email Address *</Label>
                      <Input id="voterEmail" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="voterPhone">Phone Number *</Label>
                      <Input id="voterPhone" type="tel" required />
                    </div>
                    <div>
                      <Label htmlFor="voteCount">Number of Votes *</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="voteCount"
                          type="number"
                          value={voteCount}
                          onChange={(e) => setVoteCount(parseInt(e.target.value) || 1)}
                          min="1"
                          className="flex-1"
                          required
                        />
                        <span className="text-sm text-muted-foreground">× ₦50</span>
                      </div>
                    </div>
                    <div className="bg-festival-light-green/50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="text-xl font-bold text-festival-green">₦{voteCount * 50}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => setShowVoteForm(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button type="submit" variant="festival" className="flex-1">
                        Pay & Vote
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
