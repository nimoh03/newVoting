import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BusinessPitchHero from "@/components/business-pitch/BusinessPitchHero";
import BusinessPitchSidebar from "@/components/business-pitch/BusinessPitchSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Trophy, Users, Star, DollarSign, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
// Network timeout constants
const NETWORK_TIMEOUTS = {
  CATEGORY_FETCH: 30000, // 30s for categories
  IMAGE_UPLOAD: 60000, // 60s for image uploads
  REGISTRATION: 45000, // 45s for registration
  PRICE_FETCH: 15000, // 15s for price
};

const MAX_RETRIES = 3;
interface Category {
  id: string;
  name: string;
  description?: string;
  pitch?: boolean;
}

interface PaymentDetails {
  transactionId: string;
  txRef: string;
  amount: number;
}

const BusinessPitchRegister = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [registrationPrice, setRegistrationPrice] = useState<number>(15000); // Default fallback
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    businessName: "",
    category: "",
    description: "",
    businessLogo: null as File | null,
    personalPhoto: null as File | null,
  });

  // API Configuration
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;
  const CATEGORIES_API_URL = import.meta.env.VITE_CATEGORIES_API_URL;
  const IMAGE_UPLOAD_URL = import.meta.env.VITE_IMAGE_UPLOAD_URL;
  const PRICE_API_URL = import.meta.env.VITE_PRICE_API_URL;

  // Fetch categories with network handling
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);

      const timeoutId = setTimeout(() => {
        if (!navigator.onLine) {
          toast({
            title: "No Internet Connection",
            description: "Please check your connection and try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Network Slow",
            description:
              "Loading categories is taking longer than usual. Please wait...",
            variant: "default",
          });
        }
      }, NETWORK_TIMEOUTS.CATEGORY_FETCH);

      const response = await fetch(CATEGORIES_API_URL, {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      const categoryArray = Array.isArray(data.data) ? data.data : [];

      const pitchCategories = categoryArray.filter((cat) => cat.pitch === true);

      setCategories(pitchCategories);

      if (pitchCategories.length === 0) {
        toast({
          title: "No Categories Available",
          description:
            "No categories are currently available for business pitch registration.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast({
        title: "Network Error",
        description:
          "Could not load categories from server. Using offline defaults.",
        variant: "destructive",
      });

      const defaultCategories: Category[] = [
        { id: "technology", name: "Technology", pitch: true },
        { id: "agriculture", name: "Agriculture", pitch: true },
        { id: "fashion", name: "Fashion & Design", pitch: true },
        { id: "food", name: "Food & Beverages", pitch: true },
        { id: "health", name: "Health & Wellness", pitch: true },
        { id: "education", name: "Education", pitch: true },
        { id: "finance", name: "Finance & Fintech", pitch: true },
        { id: "entertainment", name: "Entertainment & Media", pitch: true },
        { id: "retail", name: "Retail & E-commerce", pitch: true },
        {
          id: "transportation",
          name: "Transportation & Logistics",
          pitch: true,
        },
        { id: "real-estate", name: "Real Estate", pitch: true },
        { id: "manufacturing", name: "Manufacturing", pitch: true },
        { id: "consulting", name: "Consulting & Services", pitch: true },
        { id: "other", name: "Other", pitch: true },
      ];

      setCategories(defaultCategories);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fetch registration price
 const fetchRegistrationPrice = async (retryCount = 0) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), NETWORK_TIMEOUTS.PRICE_FETCH);
    
    const response = await fetch(PRICE_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    // ... rest of success logic
  } catch (error) {
    if (retryCount < MAX_RETRIES && navigator.onLine) {
      console.log(`Retrying price fetch, attempt ${retryCount + 1}`);
      setTimeout(() => fetchRegistrationPrice(retryCount + 1), 1000 * (retryCount + 1));
      return;
    }
    
    console.error("Error fetching price:", error);
    toast({
      title: "Price Loading Failed",
      description: `Using default registration fee of ₦${registrationPrice.toLocaleString()}`,
      variant: "default",
    });
  }
};

  // Load categories and price on component mount
  useEffect(() => {
    fetchCategories();
    fetchRegistrationPrice();
  }, []);

  useEffect(() => {
    return () => {
      // Help garbage collection by clearing file references
      if (formData.businessLogo) {
        console.debug("Cleaning up business logo on unmount");
      }
      if (formData.personalPhoto) {
        console.debug("Cleaning up personal photo on unmount");
      }
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    if (!file) {
      setFormData((prev) => ({
        ...prev,
        [field]: null,
      }));
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File Too Large",
        description: `Please select a file smaller than ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB. Current file: ${(file.size / (1024 * 1024)).toFixed(1)}MB`,
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please select a PNG or JPEG image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate if it's actually an image
    const img = new Image();
    img.onload = () => {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));

      toast({
        title: "File Selected",
        description: `${file.name} (${(file.size / (1024 * 1024)).toFixed(
          1
        )}MB)`,
        variant: "default",
      });
    };

    img.onerror = () => {
      toast({
        title: "Invalid Image",
        description: "The selected file is not a valid image.",
        variant: "destructive",
      });
    };

    img.src = URL.createObjectURL(file);
  };

  const validateForm = async () => {
    const required = [
      "fullName",
      "phone",
      "email",
      "businessName",
      "category",
      "description",
    ];
    const missing = required.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missing.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in: ${missing.join(", ")}`,
        variant: "destructive",
      });
      return false;
    }

    if (!formData.personalPhoto) {
      toast({
        title: "Validation Error",
        description: "Personal picture is required",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    const phoneRegex = /^(\+234|0)[7-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid Nigerian phone number",
        variant: "destructive",
      });
      return false;
    }

    // Check if email already exists before proceeding to payment
    try {
      toast({
        title: "Validating Email",
        description: "Checking if email is available...",
      });

      const checkEmailResponse = await fetch(`${API_URL}/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          emailAddress: formData.email.trim().toLowerCase(),
        }),
      });

      if (
        checkEmailResponse.status === 409 ||
        checkEmailResponse.status === 400
      ) {
        const errorData = await checkEmailResponse.json();
        toast({
          title: "Email Already Registered",
          description:
            errorData.message ||
            "This email address is already registered for the business pitch contest.",
          variant: "destructive",
        });
        return false;
      }

      // If the endpoint doesn't exist (404) or other errors, continue anyway
      // This ensures the form still works even if email checking isn't implemented
      if (!checkEmailResponse.ok && checkEmailResponse.status !== 404) {
        console.warn("Email check failed, but continuing with registration");
      }
    } catch (error) {
      console.warn("Email validation failed, continuing anyway:", error);
      toast({
        title: "Warning",
        description:
          "Could not verify email availability. Registration will continue.",
        variant: "default",
      });
    }

    return true;
  };

  const uploadImage = async (imageFile: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Upload timeout"));
      }, NETWORK_TIMEOUTS.IMAGE_UPLOAD);

      const formData = new FormData();
      formData.append("image", imageFile);

      fetch(IMAGE_UPLOAD_URL, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
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

  // Generate transaction reference
  const generateReferenceNumber = () => {
    return `BP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if Flutterwave public key exists
    const flutterwaveKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY;
    if (!flutterwaveKey || flutterwaveKey.includes("xxxx")) {
      toast({
        title: "Payment Configuration Error",
        description:
          "Payment system is not properly configured. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      let businessLogoUrl = "";
      let personalPhotoUrl = "";

      // Step 1: Upload images first if they exist (one by one for better performance)
      const hasImages =
        (formData.businessLogo && formData.businessLogo.size > 0) ||
        (formData.personalPhoto && formData.personalPhoto.size > 0);

      if (hasImages) {
        setIsUploadingImages(true);
        toast({
          title: "Uploading Images",
          description: "Please wait while we upload your images...",
        });

        // Upload personal photo first (required)
        if (formData.personalPhoto && formData.personalPhoto.size > 0) {
          try {
            toast({
              title: "Uploading Personal Photo",
              description: "Uploading your personal picture... (1/2)",
            });
            personalPhotoUrl = await uploadImage(formData.personalPhoto);
            toast({
              title: "Personal Photo Uploaded",
              description: "Personal photo uploaded successfully!",
            });
          } catch (error) {
            console.error("Personal photo upload failed:", error);
            const hasTimeoutError =
              error instanceof Error && error.message === "Upload timeout";

            toast({
              title: hasTimeoutError ? "Network Problem" : "Upload Failed",
              description: hasTimeoutError
                ? "Personal photo upload is taking too long. Please check your network connection and try again."
                : "Failed to upload personal photo. Please try again.",
              variant: "destructive",
            });
            setIsUploadingImages(false);
            setIsLoading(false);
            return;
          }
        }

        // Upload business logo second (optional)
        if (formData.businessLogo && formData.businessLogo.size > 0) {
          try {
            toast({
              title: "Uploading Business Logo",
              description: "Uploading your business logo... (2/2)",
            });
            businessLogoUrl = await uploadImage(formData.businessLogo);
            toast({
              title: "Business Logo Uploaded",
              description: "Business logo uploaded successfully!",
            });
          } catch (error) {
            console.error("Business logo upload failed:", error);
            const hasTimeoutError =
              error instanceof Error && error.message === "Upload timeout";

            toast({
              title: hasTimeoutError ? "Network Problem" : "Upload Failed",
              description: hasTimeoutError
                ? "Business logo upload is taking too long. Please check your network connection and try again."
                : "Failed to upload business logo. Please try again.",
              variant: "destructive",
            });
            setIsUploadingImages(false);
            setIsLoading(false);
            return;
          }
        }

        setIsUploadingImages(false);
        toast({
          title: "All Images Uploaded Successfully",
          description: "Now proceeding to payment...",
        });
      }

      // Step 2: After images are uploaded, prepare payment
      toast({
        title: "Preparing Payment",
        description: "Setting up your payment details...",
      });

      const txRef = generateReferenceNumber();

      // Configure Flutterwave payment with the fetched price
      const paymentConfig = {
        public_key: flutterwaveKey,
        tx_ref: txRef,
        amount: registrationPrice,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email: formData.email.trim().toLowerCase(),
          phone_number: formData.phone.trim().replace(/\s/g, ""),
          name: formData.fullName.trim(),
        },
        customizations: {
          title: "Business Pitch Registration",
          description: `Registration fee for ${formData.businessName.trim()}`,
          logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        },
      };

      setIsLoading(false);

      // Step 3: Open payment modal
      const handleFlutterPayment = useFlutterwave(paymentConfig);

      handleFlutterPayment({
        callback: async (response: any) => {
          try {
            closePaymentModal();

            if (response.status === "successful") {
              // Images already uploaded, just submit registration data
              await submitRegistrationData({
                transactionId: response.transaction_id,
                txRef: response.tx_ref,
                amount: registrationPrice,
                businessLogoUrl,
                personalPhotoUrl,
              });
            } else {
              toast({
                title: "Payment Failed",
                description: "Payment was not successful. Please try again.",
                variant: "destructive",
              });
            }
          } catch (error) {
            console.error("Payment callback error:", error);
            toast({
              title: "Error",
              description:
                "An error occurred processing your payment. Please contact support if you were charged.",
              variant: "destructive",
            });
          }
        },
        onClose: () => {
          toast({
            title: "Payment Cancelled",
            description:
              "Payment was cancelled. Registration was not completed.",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error("Error in registration process:", error);
      setIsUploadingImages(false);
      setIsLoading(false);

      toast({
        title: "Error",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Submit registration data after successful payment (images already uploaded)
  const submitRegistrationData = async ({
    transactionId,
    txRef,
    amount,
    businessLogoUrl,
    personalPhotoUrl,
  }: PaymentDetails & {
    businessLogoUrl: string;
    personalPhotoUrl: string;
  }) => {
    try {
      setIsSubmittingApplication(true);
      toast({
        title: "Finalizing Registration",
        description: "Submitting your business pitch registration...",
      });

      const timeoutId = setTimeout(() => {
        toast({
          title: "Network Slow",
          description:
            "Submission is taking longer than usual. Please refresh and try again.",
          variant: "destructive",
        });
      }, 15000);

      const registrationData = {
        request: {
          fullName: formData.fullName.trim(),
          emailAddress: formData.email.trim().toLowerCase(),
          phoneNumber: formData.phone.trim().replace(/\s/g, ""),
          address: "", // Required field, using empty string as default
          businessName: formData.businessName.trim(),
          picture: personalPhotoUrl,
          logo: businessLogoUrl,
          businessCategoryId: formData.category,
          businessDescription: formData.description.trim(),
          businessLogo: businessLogoUrl,
          ownersPicture: personalPhotoUrl,
          referenceNumber: txRef, // Only the reference number as per API schema
        },
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(registrationData),
      });

      clearTimeout(timeoutId);

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: "Registration Successful!",
          description:
            responseData.message ||
            `Your business pitch registration has been submitted successfully. Payment of ₦${amount.toLocaleString()} confirmed. You'll receive a confirmation email shortly.`,
        });

        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          businessName: "",
          category: "",
          description: "",
          businessLogo: null,
          personalPhoto: null,
        });

        // Clear file inputs
        const businessLogoInput = document.getElementById(
          "businessLogo"
        ) as HTMLInputElement;
        const personalPhotoInput = document.getElementById(
          "personalPhoto"
        ) as HTMLInputElement;
        if (businessLogoInput) businessLogoInput.value = "";
        if (personalPhotoInput) personalPhotoInput.value = "";
      } else {
        const errorMessage =
          responseData.message ||
          responseData.messages?.[0] ||
          responseData.error ||
          "Registration failed. Please try again.";

        toast({
          title: "Registration Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);

      const isNetworkError =
        !navigator.onLine || error.message.includes("fetch");

      toast({
        title: isNetworkError ? "Network Error" : "Registration Error",
        description: isNetworkError
          ? "Please check your internet connection and try again."
          : "Registration failed. Please contact support if this continues.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingApplication(false);
      setIsLoading(false);
    }
  };

  const isFormDisabled =
    isUploadingImages || isSubmittingApplication || isLoading;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}

      <BusinessPitchHero />

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            <BusinessPitchSidebar registrationPrice={registrationPrice} />

            {/* Registration Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Register for Business Pitch Contest
                    {(isUploadingImages ||
                      isSubmittingApplication ||
                      isLoading) && (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    )}
                  </CardTitle>
                  <CardDescription>
                    {isUploadingImages
                      ? "Uploading images, please wait..."
                      : isSubmittingApplication
                      ? "Finalizing your registration..."
                      : isLoading
                      ? "Preparing payment..."
                      : "Fill out the form below to register for the competition"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          disabled={isFormDisabled}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234 800 000 0000"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          disabled={isFormDisabled}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={isFormDisabled}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          placeholder="Your business name"
                          value={formData.businessName}
                          onChange={(e) =>
                            handleInputChange("businessName", e.target.value)
                          }
                          disabled={isFormDisabled}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Business Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            handleInputChange("category", value)
                          }
                          required
                          disabled={loadingCategories || isFormDisabled}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                loadingCategories
                                  ? "Loading categories..."
                                  : "Select category"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {loadingCategories ? (
                              <SelectItem value="loading" disabled>
                                <div className="flex items-center">
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Loading categories...
                                </div>
                              </SelectItem>
                            ) : categories.length > 0 ? (
                              categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-categories" disabled>
                                No pitch categories available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">
                        Business Description *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your business in 500 characters max"
                        maxLength={500}
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        disabled={isFormDisabled}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.description.length}/500 characters
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessLogo">
                          Business Logo/Product Image
                        </Label>
                        <div className="mt-2">
                          <input
                            type="file"
                            id="businessLogo" // or "personalPhoto"
                            accept={ALLOWED_FILE_TYPES.join(",")}
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleFileChange("businessLogo", file); // or "personalPhoto"
                            }}
                            disabled={isFormDisabled}
                            className="hidden"
                          />
                          <label
                            htmlFor="businessLogo"
                            className={`border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-festival-green transition-colors cursor-pointer block ${
                              isFormDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                            {formData.businessLogo ? (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-green-700">
                                  ✓ {formData.businessLogo.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(
                                    formData.businessLogo.size /
                                    (1024 * 1024)
                                  ).toFixed(1)}
                                  MB
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                Click to upload or drag and drop
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG up to 2MB
                            </p>
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="personalPhoto">
                          Personal Picture *
                        </Label>
                        <div className="mt-2">
                          <input
                            type="file"
                            id="personalPhoto" // or "personalPhoto"
                            accept={ALLOWED_FILE_TYPES.join(",")}
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleFileChange("personalPhoto", file); // or "personalPhoto"
                            }}
                            disabled={isFormDisabled}
                            className="hidden"
                          />
                          <label
                            htmlFor="personalPhoto"
                            className={`border-2 border-dashed border-muted rounded-lg p-4 text-center hover:border-festival-green transition-colors cursor-pointer block ${
                              isFormDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              {formData.personalPhoto
                                ? formData.personalPhoto.name
                                : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG up to 2MB
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>

                    {(isUploadingImages ||
                      isSubmittingApplication ||
                      isLoading) && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                        <div className="text-center">
                          <p className="text-blue-800 font-medium">
                            {isUploadingImages
                              ? "Uploading your images..."
                              : isSubmittingApplication
                              ? "Submitting your registration..."
                              : "Preparing payment..."}
                          </p>
                          <p className="text-blue-600 text-sm mt-1">
                            Please don't close this window
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold">Entry Fee</span>
                        <span className="text-2xl font-bold text-festival-green">
                          ₦{registrationPrice.toLocaleString()}
                        </span>
                      </div>
                      <Button
                        type="submit"
                        variant="festival"
                        size="lg"
                        className="w-full"
                        disabled={isFormDisabled || categories.length === 0}
                      >
                        {isUploadingImages ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading Images...
                          </>
                        ) : isSubmittingApplication ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing Registration...
                          </>
                        ) : isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Preparing Payment...
                          </>
                        ) : (
                          "Register & Pay Entry Fee"
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        You will be redirected to payment gateway after form
                        validation
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
