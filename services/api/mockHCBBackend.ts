
import { InternalAxiosRequestConfig } from 'axios';
import api from '../api';

// This is a mock implementation of what would be your secure backend API
// In a real implementation, this code would be running on your backend server,
// not in the browser

/**
 * Mock implementation of the secure backend API endpoint for HCB
 * 
 * IMPORTANT: In a production environment, API keys should NEVER be stored 
 * in frontend code. This is only for demonstration purposes.
 * 
 * In a real implementation:
 * 1. Set up a backend server (Node.js, Python, etc.)
 * 2. Store your API keys securely on the server (environment variables)
 * 3. Create API endpoints that make authenticated requests to HCB
 * 4. Call your backend API from your frontend code
 */
export const setupMockHCBBackend = () => {
  // Intercept requests to our mock backend API endpoint
  api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    // Check if this request is to our mock backend endpoint
    if (config.url?.startsWith('/api/hcb')) {
      // Rewrite the URL to the real HCB API
      const path = config.url.replace('/api/hcb', '');
      
      if (path === '/organization') {
        // Mock response for organization data
        throw new Error('This is a mock response. In production, this would make an authenticated request to the HCB API');
      }
      
      if (path === '/transactions') {
        // Mock response for transactions data
        throw new Error('This is a mock response. In production, this would make an authenticated request to the HCB API');
      }
    }
    
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
};
