// Get the API base URL based on environment
export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URL
    return '';
  }
  
  // Server-side: use environment variable or default
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};

export const API_BASE_URL = getApiBaseUrl();