export const API_CONFIG = {
  API_KEY: import.meta.env.VITE_API_KEY,
  API_URL: import.meta.env.VITE_API_URL,
  CATEGORIES_API_URL: import.meta.env.VITE_CATEGORIES_API_URL,
  IMAGE_UPLOAD_URL: import.meta.env.VITE_IMAGE_UPLOAD_URL,
  PRICE_API_URL: import.meta.env.VITE_PRICE_API_URL,
  FLUTTERWAVE_PUBLIC_KEY: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
};

// Validation function to ensure all required env vars are present
export const validateConfig = () => {
  const missing = Object.entries(API_CONFIG)
    .filter(([key, value]) => !value || value.includes('xxxx'))
    .map(([key]) => key);
  
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
};