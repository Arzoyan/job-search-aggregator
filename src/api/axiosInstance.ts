import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: "https://master--job-search-aggregator.netlify.app/api/jobs/", // Base URL for your API
  timeout: 2000, // Timeout set to 2 seconds
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here, like adding headers if needed
    return config;
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // This will return the response data directly
    return response.data; // Returning only data for convenience
  },
  (error) => {
    // Handle response errors here
    if (error.response) {
      // The request was made, but the server responded with a status code

      return Promise.reject(error.response.data); // Optionally return the error data
    } else if (error.request) {
      // The request was made, but no response was received
      return Promise.reject("No response received");
    } else {
      // Something happened in setting up the request that triggered an error
      return Promise.reject(error.message);
    }
  },
);

export default axiosInstance;
