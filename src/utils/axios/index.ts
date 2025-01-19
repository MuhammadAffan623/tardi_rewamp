import axios, { AxiosRequestConfig, Method } from "axios";

// Base URL for API requests
const API_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000/api/v1";
console.log("API_BASE_URL == >", API_BASE_URL);
/**
 * Axios helper function to make API calls.
 * @param endpoint - API endpoint (e.g., "/users")
 * @param method - HTTP method (e.g., "GET", "POST", etc.)
 * @param body - Request payload (for POST/PUT requests)
 * @param config - Additional Axios configuration (optional)
 * @returns Response data from the API
 */
export const apiRequest = async <T>(
  endpoint: string,
  method: Method,
  body?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${endpoint}`,
      method,
      data: body,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    // Handle errors (can be extended for specific needs)
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while making the API request"
    );
  }
};
