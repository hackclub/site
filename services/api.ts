
import axios from 'axios';

// Base instance with common configuration
const api = axios.create({
  timeout: 15000, // Increased timeout for potentially slow API responses
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor to handle common errors
api.interceptors.response.use(
  response => response,
  error => {
    // Handle rate limiting or other common errors
    if (error.response) {
      if (error.response.status === 429) {
        console.warn('Rate limit exceeded for API. Using fallback data.');
      } else if (error.response.status === 404) {
        console.warn('Resource not found. Check API endpoint.');
      }
    } else if (error.request) {
      console.error('No response received from API request:', error.request);
    } else {
      console.error('Error setting up API request:', error.message);
    }
    
    // Let the calling function handle the error with fallbacks
    return Promise.reject(error);
  }
);

// Setup mock API interceptors in development
if (process.env.NODE_ENV === 'development') {
  // Import and initialize mock backend
  import('./api/mockHCBBackend').then(module => {
    const { setupMockHCBBackend } = module;
    setupMockHCBBackend();
  }).catch(err => {
    console.error('Failed to load mock HCB backend:', err);
  });
}

export default api;
