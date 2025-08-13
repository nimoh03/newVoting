import { API_CONFIG } from '@/config/api';

interface UploadedImages {
  businessLogo?: string;
  personalPhoto?: string;
}

export const cleanupFailedTransaction = async (
  txRef: string, 
  uploadedImages: UploadedImages
): Promise<void> => {
  const cleanupPromises: Promise<void>[] = [];

  // Cleanup uploaded images
  if (uploadedImages.businessLogo) {
    cleanupPromises.push(deleteUploadedImage(uploadedImages.businessLogo));
  }
  
  if (uploadedImages.personalPhoto) {
    cleanupPromises.push(deleteUploadedImage(uploadedImages.personalPhoto));
  }

  // Cleanup payment reference if needed
  cleanupPromises.push(cleanupPaymentReference(txRef));

  // Run all cleanup operations
  await Promise.allSettled(cleanupPromises);
};

const deleteUploadedImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract filename from URL
    const urlParts = imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    
    await fetch(`${API_CONFIG.IMAGE_UPLOAD_URL}/delete/${filename}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': API_CONFIG.API_KEY,
      },
    });
  } catch (error) {
    console.warn('Failed to cleanup image:', imageUrl, error);
  }
};

const cleanupPaymentReference = async (txRef: string): Promise<void> => {
  try {
    // Cancel or cleanup payment reference
    await fetch(`${API_CONFIG.API_URL}/cleanup-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_CONFIG.API_KEY,
      },
      body: JSON.stringify({ txRef }),
    });
  } catch (error) {
    console.warn('Failed to cleanup payment reference:', txRef, error);
  }
};