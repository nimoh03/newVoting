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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNomineeLogin = (e) => {
    e.preventDefault();
    toast({
      title: "Login Successful!",
      description: "Welcome to your nominee dashboard.",
    });
    navigate("/nominee-dashboard");
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    toast({
      title: "Admin Login Successful!",
      description: "Welcome to the super admin dashboard.",
    });
    navigate("/super-admin");
  };
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch('http://placid-002-site24.qtempurl.com/api/v1/catalogue/upload/image', {
      method: 'POST',
      headers: {
        'x-api-key': 'H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    // Assuming the response contains the image URL in a property like 'url' or 'imageUrl'
    // Adjust this based on your actual API response structure
    return data.url || data.imageUrl || data.data?.url;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};

// Updated form submission handler with parallel image uploads
const handleNomineeSignup = async (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const logoFile = formData.get('logo');
  const photoFile = formData.get('photo');

  try {
    // Show loading toast
    toast({
      title: "Submitting Application",
      description: "Processing your nomination...",
    });

    let logoUrl = '';
    let photoUrl = '';

    // Upload both images in parallel if they exist
    const uploadPromises = [];
    
    if (logoFile && logoFile.size > 0) {
      uploadPromises.push(
        uploadImage(logoFile)
          .then(url => {
            logoUrl = url;
            return { type: 'logo', success: true, url };
          })
          .catch(error => {
            console.error('Logo upload failed:', error);
            toast({
              title: "Image Upload Failed",
              description: "Please re-upload your company logo. Network error occurred.",
              variant: "destructive",
            });
            return { type: 'logo', success: false, error };
          })
      );
    }

    if (photoFile && photoFile.size > 0) {
      uploadPromises.push(
        uploadImage(photoFile)
          .then(url => {
            photoUrl = url;
            return { type: 'photo', success: true, url };
          })
          .catch(error => {
            console.error('Photo upload failed:', error);
            toast({
              title: "Image Upload Failed",
              description: "Please re-upload your profile picture. Network error occurred.",
              variant: "destructive",
            });
            return { type: 'photo', success: false, error };
          })
      );
    }

    // Wait for all uploads to complete (or fail)
    if (uploadPromises.length > 0) {
      const uploadResults = await Promise.all(uploadPromises);
      
      // Check if any uploads failed
      const failedUploads = uploadResults.filter(result => !result.success);
      if (failedUploads.length > 0) {
        // Don't proceed if any image uploads failed
        return;
      }

      // Update URLs from successful uploads
      uploadResults.forEach(result => {
        if (result.success) {
          if (result.type === 'logo') logoUrl = result.url;
          if (result.type === 'photo') photoUrl = result.url;
        }
      });
    }

    // Prepare the main API request payload
    const nomineeData = {
      fullName: formData.get('name'),
      companyName: formData.get('companyName'),
      logo: logoUrl,
      picture: photoUrl,
      biography: formData.get('biography'),
      password: formData.get('password'),
      categoryId: '25F38329-554C-4345-909B-1154224722DC', // Hardcoded category ID
      phoneNumber: formData.get('phoneNumber'),
      address: formData.get('address'),
      emailAddress: formData.get('email'),
    };

    // Submit the main form
    toast({
      title: "Finalizing Application",
      description: "Submitting your nomination application...",
    });
    
    const response = await fetch('http://placid-002-site24.qtempurl.com/api/v1/nominee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH',
      },
      body: JSON.stringify(nomineeData),
    });

    const responseData = await response.json();

    if (response.ok) {
      // Success
      toast({
        title: "Application Submitted!",
        description: responseData.message || "Your nomination has been submitted successfully. You will receive a confirmation email shortly.",
        variant: "default",
      });
      
      // Reset form
      event.target.reset();
      
      // Optional: redirect or perform other success actions
      // window.location.href = '/success';
      
    } else {
      // Handle different error status codes
      let errorTitle = "Submission Failed";
      let errorDescription = "Something went wrong. Please try again.";
      
      if (response.status >= 400 && response.status < 500) {
        // Client errors (400-499)
        errorDescription = responseData.message || 
          responseData.error || 
          `Invalid request: ${response.status}`;
        
        if (response.status === 400) {
          errorTitle = "Invalid Information";
          errorDescription = responseData.message || "Please check your information and try again.";
        } else if (response.status === 401) {
          errorTitle = "Authentication Failed";
          errorDescription = "Authentication failed. Please contact support.";
        } else if (response.status === 403) {
          errorTitle = "Access Denied";
          errorDescription = "Access denied. Please contact support.";
        } else if (response.status === 409) {
          errorTitle = "Account Exists";
          errorDescription = "An account with this email already exists.";
        } else if (response.status === 422) {
          errorTitle = "Validation Error";
          errorDescription = "Please check all required fields and try again.";
        }
      } else if (response.status >= 500) {
        // Server errors (500-599)
        errorTitle = "Server Error";
        errorDescription = "Server error. Please try again later or contact support.";
      }

      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
    }

  } catch (error) {
    console.error('Submission error:', error);
    
    let errorTitle = "Network Error";
    let errorDescription = "Network error. Please check your connection and try again.";
    
    if (error.message.includes('fetch')) {
      errorDescription = "Unable to connect to server. Please check your internet connection.";
    }
    
    toast({
      title: errorTitle,
      description: errorDescription,
      variant: "destructive",
    });
  }
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <LogIn className="w-16 h-16 mx-auto mb-6 animate-festival-float" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dashboard Access
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Login to access your nominee dashboard or admin panel
          </p>
        </div>
      </section>

      {/* Login Forms */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="nominee" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="nominee">Nominee Login</TabsTrigger>
              <TabsTrigger value="admin">Admin Login</TabsTrigger>
            </TabsList>

            <TabsContent value="nominee">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Login Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LogIn className="w-5 h-5 text-festival-green" />
                      Nominee Login
                    </CardTitle>
                    <CardDescription>
                      Access your voting dashboard and track your progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleNomineeLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          required
                        />
                      </div>

                      <div className="text-right">
                        <Button
                          variant="link"
                          className="text-festival-green p-0"
                        >
                          Forgot Password?
                        </Button>
                      </div>

                      <Button
                        type="submit"
                        variant="festival"
                        className="w-full"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login to Dashboard
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Signup Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-festival-green" />
                      Apply as Nominee
                    </CardTitle>
                    <CardDescription>
                      Register to participate in the Youth Excellence Awards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleNomineeSignup} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          placeholder="Your company name"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          placeholder="Your phone number"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          placeholder="Your address"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="biography">Biography</Label>
                        <textarea
                          id="biography"
                          name="biography"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us about yourself and your achievements"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="categoryId">Category</Label>
                        <select
                          id="categoryId"
                          name="categoryId"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="3fa85f64-5717-4562-b3fc-2c963f66afa6">
                            Entrepreneurship
                          </option>
                          {/* Add more categories if needed */}
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="logo">Company Logo</Label>
                        <Input
                          id="logo"
                          name="logo"
                          type="file"
                          accept="image/*"
                          className="file:bg-transparent file:border-0 file:bg-background file:text-sm file:font-medium"
                        />
                      </div>

                      <div>
                        <Label htmlFor="photo">Profile Picture</Label>
                        <Input
                          id="photo"
                          name="photo"
                          type="file"
                          accept="image/*"
                          className="file:bg-transparent file:border-0 file:bg-background file:text-sm file:font-medium"
                        />
                      </div>

                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Create a password"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="festival-outline"
                        className="w-full"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Apply for Nomination
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Applications are reviewed by admin before approval
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Benefits Section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Nominee Dashboard Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-festival-green rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h4 className="font-semibold mb-2">
                        Instant Notifications
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Get email alerts every time someone votes for you
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-festival-emerald rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h4 className="font-semibold mb-2">Voter Information</h4>
                      <p className="text-sm text-muted-foreground">
                        See who voted for you and track your supporters
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-festival-gold rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lock className="w-6 h-6 text-foreground" />
                      </div>
                      <h4 className="font-semibold mb-2">Private Dashboard</h4>
                      <p className="text-sm text-muted-foreground">
                        Your vote data is private and secure
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <div className="max-w-md mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-festival-green" />
                      Super Admin Login
                    </CardTitle>
                    <CardDescription>
                      Access the administrative dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAdminLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="adminEmail">Admin Email</Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          placeholder="admin@oyofestival.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="adminPassword">Admin Password</Label>
                        <Input
                          id="adminPassword"
                          type="password"
                          placeholder="Enter admin password"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="festival"
                        className="w-full"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Access Admin Panel
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-center text-lg">
                      Admin Capabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Manage nominee registrations and verification</li>
                      <li>• Monitor votes and revenue in real-time</li>
                      <li>• View all event registrations and bookings</li>
                      <li>• Configure system settings and pricing</li>
                      <li>• Export data and generate reports</li>
                      <li>• Approve or reject nominee applications</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
