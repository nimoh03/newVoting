import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { API_CONFIG } from '@/config/api';
import { withRetry, isNetworkError } from '@/utils/retry';

export const useImageUpload = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});

  const uploadImage = useCallback(async (imageFile: File, progressKey: string): Promise<string> => {
    setIsUploading(true);
    setUploadProgress(prev => ({ ...prev, [progressKey]: 0 }));

    try {
      const uploadWithProgress = async (): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", imageFile);

          const xhr = new XMLHttpRequest();

          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
              const percentComplete = (e.loaded / e.total) * 100;
              setUploadProgress(prev => ({ ...prev, [progressKey]: percentComplete }));
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const data = JSON.parse(xhr.responseText);
                const imageUrl = data.url || data.imageUrl || data.data?.url;
                if (!imageUrl) throw new Error("No URL returned from upload");
                resolve(imageUrl);
              } catch (parseError) {
                reject(new Error("Invalid response format"));
              }
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          });

          xhr.addEventListener('error', () => {
            reject(new Error("Network error during upload"));
          });

          xhr.addEventListener('timeout', () => {
            reject(new Error("Upload timeout"));
          });

          xhr.timeout = 30000; // 30 second timeout
          xhr.open('POST', API_CONFIG.IMAGE_UPLOAD_URL);
          xhr.setRequestHeader('x-api-key', API_CONFIG.API_KEY);
          xhr.send(formData);
        });
      };

      const imageUrl = await withRetry(uploadWithProgress, {
        maxAttempts: 2,
        delay: 2000,
      });

      setUploadProgress(prev => ({ ...prev, [progressKey]: 100 }));
      return imageUrl;

    } catch (error) {
      console.error(`${progressKey} upload failed:`, error);
      
      if (isNetworkError(error)) {
        throw new Error("Network error during upload. Please check your connection and try again.");
      } else {
        throw new Error("Upload failed. Please try again.");
      }
    } finally {
      setIsUploading(false);
      // Clear progress after a delay
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[progressKey];
          return newProgress;
        });
      }, 2000);
    }
  }, [toast]);

  return {
    uploadImage,
    isUploading,
    uploadProgress,
  };
};