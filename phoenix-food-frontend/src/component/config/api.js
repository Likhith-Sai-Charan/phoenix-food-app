import axios from "axios";

export const API_URL = "http://localhost:5454";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to log every response
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.data); // Logs all successful responses
    return response; // Must return response to continue the chain
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    ); // Logs error responses
    return Promise.reject(error); // Propagate the error to catch in actions
  }
);

// Optional: Request interceptor to log every request
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);