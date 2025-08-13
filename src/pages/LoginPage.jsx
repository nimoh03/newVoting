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
import { LogIn, UserPlus, Mail, Lock, User, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/Authcontext"; // adjust path

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  // State for categories and loading
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [showLargeApplyForm, setShowLargeApplyForm] = useState(false);

  // Fetch categories on component mount
  // Updated useEffect for fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch(
          "https://api.ibadanmarketsquare.ng/api/v1/businesscategory",
          {
            headers: {
              "x-api-key": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
            },
          }
        );

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        const categoryArray = Array.isArray(data.data) ? data.data : [];

        // Filter categories to only show those where award === true
        const awardCategories = categoryArray.filter(
          (category) => category.award === true
        );

        setCategories(awardCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [toast]);
  // const handleNomineeLogin = (e) => {
  //   e.preventDefault();
  //   toast({
  //     title: "Login Successful!",
  //     description: "Welcome to your nominee dashboard.",
  //   });
  //   navigate("/nominee-dashboard");
  // };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    toast({
      title: "Admin Login Successful!",
      description: "Welcome to the super admin dashboard.",
    });
    navigate("/super-admin");
  };
  const [loginData, setLoginData] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNomineeLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Set timeout for slow network detection
    const timeoutId = setTimeout(() => {
      toast({
        title: "Network Slow",
        description:
          "Connection is taking longer than usual. Please refresh and try again.",
        variant: "destructive",
      });
    }, 10000); // 10 seconds

    try {
      const response = await fetch(
        "https://api.ibadanmarketsquare.ng/api/v1/account/authenticateuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH`,
            // Alternative header format if the above doesn't work:
            "X-API-Key": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
          },
          body: JSON.stringify({
            email: loginData.loginEmail,
            password: loginData.loginPassword,
            ip: "string",
            browser: "string",
          }),
        }
      );

      // Clear timeout if request completes within 10 seconds
      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Login Successful!",
          description: "Welcome to your nominee dashboard.",
        });

        // Store auth token if provided in response
        login(data.data.userId);

        navigate("/nominee-dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Clear timeout in case of error
      clearTimeout(timeoutId);

      console.error("Login error:", error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to server. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Upload timeout"));
      }, 8000); // 8 second timeout

      const formData = new FormData();
      formData.append("image", imageFile);

      fetch("https://api.ibadanmarketsquare.ng/api/v1/catalogue/upload/image", {
        method: "POST",
        headers: {
          "x-api-key": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
        },
        body: formData,
      })
        .then((response) => {
          clearTimeout(timeout);
          if (!response.ok) {
            throw new Error(`Upload failed with status ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const imageUrl = data.url || data.imageUrl || data.data?.url;
          if (!imageUrl) throw new Error("No URL returned from upload");
          resolve(imageUrl);
        })
        .catch((error) => {
          clearTimeout(timeout);
          console.error("Image upload error:", error);
          reject(error);
        });
    });
  };

  const handleNomineeSignup = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const logoFile = formData.get("logo");
    const photoFile = formData.get("photo");
    const selectedCategoryId = formData.get("categoryId");

    if (!selectedCategoryId) {
      toast({
        title: "Category Required",
        description: "Please select a category for your nomination.",
        variant: "destructive",
      });
      return;
    }

    try {
      let logoUrl = "";
      let photoUrl = "";

      // Check if we have images to upload
      const hasImages =
        (logoFile && logoFile.size > 0) || (photoFile && photoFile.size > 0);

      if (hasImages) {
        setIsUploadingImages(true);

        const uploadPromises = [];

        if (logoFile && logoFile.size > 0) {
          uploadPromises.push(
            uploadImage(logoFile)
              .then((url) => {
                logoUrl = url;
                return { type: "logo", success: true, url };
              })
              .catch((error) => {
                console.error("Logo upload failed:", error);
                return { type: "logo", success: false, error };
              })
          );
        }

        if (photoFile && photoFile.size > 0) {
          uploadPromises.push(
            uploadImage(photoFile)
              .then((url) => {
                photoUrl = url;
                return { type: "photo", success: true, url };
              })
              .catch((error) => {
                console.error("Photo upload failed:", error);
                return { type: "photo", success: false, error };
              })
          );
        }

        // Wait for all uploads to complete
        const uploadResults = await Promise.all(uploadPromises);

        // Check if any uploads failed
        const failedUploads = uploadResults.filter((result) => !result.success);
        if (failedUploads.length > 0) {
          const failedTypes = failedUploads.map((f) => f.type).join(", ");

          // Check if it's a timeout error
          const hasTimeoutError = failedUploads.some(
            (f) => f.error && f.error.message === "Upload timeout"
          );

          if (hasTimeoutError) {
            toast({
              title: "Network Problem",
              description:
                "Image upload is taking too long. Please check your network connection and try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Image Upload Failed",
              description: `Failed to upload ${failedTypes}. Please try again.`,
              variant: "destructive",
            });
          }
          return;
        }

        // Update URLs from successful uploads
        uploadResults.forEach((result) => {
          if (result.success) {
            if (result.type === "logo") logoUrl = result.url;
            if (result.type === "photo") photoUrl = result.url;
          }
        });

        setIsUploadingImages(false);
      }

      // Start final submission
      setIsSubmittingApplication(true);

      toast({
        title: "Finalizing Application",
        description: "Submitting your nomination application...",
      });

      // Prepare the main API request payload
      const nomineeData = {
        fullName: formData.get("name"),
        companyName: formData.get("companyName"),
        logo: logoUrl,
        picture: photoUrl,
        biography: formData.get("biography"),
        password: formData.get("password"),
        categoryId: selectedCategoryId,
        phoneNumber: formData.get("phoneNumber"),
        address: formData.get("address"),
        emailAddress: formData.get("email"),
      };

      const response = await fetch(
        "https://api.ibadanmarketsquare.ng/api/v1/nominee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "H7QzFHJx4w46fI5Uzi4RTYJUINx450vtTwlEXpdgYUH",
          },
          body: JSON.stringify(nomineeData),
        }
      );

      const responseData = await response.json();

      // Add debugging to see the actual response structure

      if (response.ok) {
        // Fixed: Safe access to message property with multiple fallbacks
        let successMessage =
          "Your nomination has been submitted successfully. You will receive a confirmation email shortly.";

        // Try different possible response structures
        if (
          responseData.message &&
          Array.isArray(responseData.message) &&
          responseData.message.length > 0
        ) {
          successMessage = responseData.message[0];
        } else if (
          responseData.message &&
          typeof responseData.message === "string"
        ) {
          successMessage = responseData.message;
        } else if (responseData.data && responseData.data.message) {
          successMessage = responseData.data.message;
        } else if (responseData.success && responseData.data) {
          successMessage = "Application submitted successfully!";
        }

        toast({
          title: "Application Submitted!",
          description: successMessage,
        });

        // Reset form
        event.target.reset();
        setShowLargeApplyForm(false);
      } else {
        // Fixed: Safe access to error message with multiple fallbacks
        let errorMessage = "Something went wrong. Please try again.";

        // Try different possible error response structures
        if (
          responseData.messages &&
          Array.isArray(responseData.messages) &&
          responseData.messages.length > 0
        ) {
          errorMessage = responseData.messages[0];
        } else if (
          responseData.message &&
          Array.isArray(responseData.message) &&
          responseData.message.length > 0
        ) {
          errorMessage = responseData.message[0];
        } else if (
          responseData.message &&
          typeof responseData.message === "string"
        ) {
          errorMessage = responseData.message;
        } else if (
          responseData.error &&
          typeof responseData.error === "string"
        ) {
          errorMessage = responseData.error;
        } else if (responseData.data && responseData.data.error) {
          errorMessage = responseData.data.error;
        }

        toast({
          title: "Submission Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Network Error",
        description:
          "Unable to submit application. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImages(false);
      setIsSubmittingApplication(false);
    }
  };

  const isFormDisabled = isUploadingImages || isSubmittingApplication;

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
            Login to access your nominee dashboard
          </p>
        </div>
      </section>

      {/* Improved Apply Form Modal */}
      {showLargeApplyForm && (
        <div className="fixed inset-0 flex items-start justify-center p-4 z-50 overflow-y-auto bg-black/80">
          <div className="w-full max-w-4xl my-8">
            <div className="w-full shadow-2xl border-0 rounded-lg overflow-hidden bg-white">
              {/* Header */}
              <div
                className="relative pb-4 p-6 border-b border-gray-200"
                style={{ backgroundColor: "#ffffff", color: "#000000" }}
              >
                <button
                  onClick={() => setShowLargeApplyForm(false)}
                  disabled={isFormDisabled}
                  className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                  style={{ color: "#000000" }}
                >
                  <X className="w-5 h-5" style={{ color: "#000000" }} />
                </button>
                <h2
                  className="flex items-center gap-2 text-2xl font-bold"
                  style={{ color: "#000000" }}
                >
                  <UserPlus className="w-6 h-6" style={{ color: "#000000" }} />
                  <span>Nomination Application Form</span>
                  {(isUploadingImages || isSubmittingApplication) && (
                    <Loader2
                      className="w-5 h-5 animate-spin"
                      style={{ color: "#000000" }}
                    />
                  )}
                </h2>
                <p className="text-base mt-2" style={{ color: "#666666" }}>
                  {isUploadingImages
                    ? "Uploading images, please wait..."
                    : isSubmittingApplication
                    ? "Finalizing your application..."
                    : "Apply to become a nominee for the Youth Excellence Awards"}
                </p>
              </div>

              {/* Form Content */}
              <div
                className="p-6 max-h-[70vh] overflow-y-auto bg-white text-gray-900"
                style={{ backgroundColor: "white", color: "black" }}
              >
                <form onSubmit={handleNomineeSignup} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          disabled={isFormDisabled}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-festival-green focus:border-festival-green disabled:bg-gray-100 disabled:cursor-not-allowed"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          disabled={isFormDisabled}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-festival-green focus:border-festival-green disabled:bg-gray-100 disabled:cursor-not-allowed"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          placeholder="Your company name"
                          disabled={isFormDisabled}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-festival-green focus:border-festival-green disabled:bg-gray-100 disabled:cursor-not-allowed"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          placeholder="Your phone number"
                          disabled={isFormDisabled}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-festival-green focus:border-festival-green disabled:bg-gray-100 disabled:cursor-not-allowed"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          placeholder="Your address"
                          disabled={isFormDisabled}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-festival-green focus:border-festival-green disabled:bg-gray-100 disabled:cursor-not-allowed"
                          required
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="biography"
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Biography <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="biography"
                          name="biography"
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-festival-green focus:border-festival-green disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
                          placeholder="Tell us about yourself and your achievements"
                          disabled={isFormDisabled}
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="categoryId"
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Award Category <span className="text-red-500">*</span>
                        </label>
                        {loadingCategories ? (
                          <div className="border border-gray-300 rounded-md p-3 flex items-center gap-2 text-gray-900">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading categories...
                          </div>
                        ) : (
                          <select
                            id="categoryId"
                            name="categoryId"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-festival-green focus:border-festival-green disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={isFormDisabled}
                            required
                          >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Create a password"
                          disabled={isFormDisabled}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-festival-green focus:border-festival-green disabled:bg-gray-100 disabled:cursor-not-allowed"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="logo"
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Company Logo
                        </label>
                        <input
                          id="logo"
                          name="logo"
                          type="file"
                          accept="image/*"
                          disabled={isFormDisabled}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-festival-green file:text-white hover:file:bg-festival-green/90 disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer"
                        />
                        <p className="text-xs text-gray-600 mt-1">
                          Upload your company logo (optional)
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="photo"
                          className="block text-sm font-medium text-gray-900 mb-1"
                        >
                          Profile Picture
                        </label>
                        <input
                          id="photo"
                          name="photo"
                          type="file"
                          accept="image/*"
                          disabled={isFormDisabled}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-festival-green file:text-white hover:file:bg-festival-green/90 disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer"
                        />
                        <p className="text-xs text-gray-600 mt-1">
                          Upload your profile picture (optional)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Loading State */}
                  {(isUploadingImages || isSubmittingApplication) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                      <div className="text-center">
                        <p className="text-blue-800 font-medium">
                          {isUploadingImages
                            ? "Uploading your images..."
                            : "Submitting your application..."}
                        </p>
                        <p className="text-blue-600 text-sm mt-1">
                          Please don't close this window
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Form Actions */}
                  <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      disabled={isFormDisabled}
                      onClick={() => setShowLargeApplyForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-festival-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      style={{ color: "white", background: "black" }}
                      type="submit"
                      disabled={isFormDisabled}
                      className="min-w-[160px] px-4 py-2 text-white rounded-md hover:bg-festival-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-festival-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      {isUploadingImages ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Uploading...
                        </>
                      ) : isSubmittingApplication ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 text-center">
                    Applications are reviewed by admin before approval
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Forms */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="nominee" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="nominee">Nominee Login</TabsTrigger>
              {/* <TabsTrigger value="admin">Admin Login</TabsTrigger> */}
            </TabsList>

            <TabsContent value="nominee">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Login Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 ">
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
                        <Label htmlFor="loginEmail">Email Address</Label>
                        <Input
                          id="loginEmail"
                          name="loginEmail"
                          type="email"
                          placeholder="your.email@example.com"
                          value={loginData.loginEmail}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div>
                        <Label htmlFor="loginPassword">Password</Label>
                        <Input
                          id="loginPassword"
                          name="loginPassword"
                          type="password"
                          placeholder="Enter your password"
                          value={loginData.loginPassword}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="text-right">
                        <Button
                          variant="link"
                          className="text-festival-green p-0"
                          type="button"
                        >
                          Forgot Password?
                        </Button>
                      </div>

                      <Button
                        type="submit"
                        variant="festival"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2" />
                            Login to Dashboard
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Quick Apply CTA */}
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
                    <div className="space-y-4">
                      <div className="text-center p-6 border-2 border-dashed border-festival-green/30 rounded-lg">
                        <UserPlus className="w-12 h-12 text-festival-green mx-auto mb-4" />
                        <h3 className="font-semibold text-lg mb-2">
                          Ready to Apply?
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Join the competition and showcase your achievements to
                          win recognition and prizes.
                        </p>
                        <Button
                          onClick={() => setShowLargeApplyForm(true)}
                          variant="festival"
                          className="w-full"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Start Application
                        </Button>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-festival-green rounded-full"></div>
                          <span>Free to apply</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-festival-green rounded-full"></div>
                          <span>Admin review process</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-festival-green rounded-full"></div>
                          <span>Email notifications included</span>
                        </div>
                      </div>
                    </div>
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

            {/* <TabsContent value="admin">
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
            </TabsContent> */}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
