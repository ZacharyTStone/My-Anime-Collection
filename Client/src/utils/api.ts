import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL, TOKEN_KEY, USER_KEY } from "./constants";

// Types
export interface ApiErrorResponse {
  msg: string;
}

export interface ApiResponse<T> {
  data: T;
  msg?: string;
}

/**
 * Creates an axios instance with authentication interceptors
 * @param token - Authentication token
 * @returns Configured axios instance
 */
export const createApiClient = (token: string | null): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor - Add auth token
  instance.interceptors.request.use(
    (config) => {
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle errors
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorResponse>) => {
      if (error.response?.status === 401) {
        // Clear auth data on 401
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        // Redirect to landing page
        window.location.href = "/landing";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Handles API errors consistently
 * @param error - Axios error
 * @param defaultMessage - Default error message if none provided
 */
export const handleApiError = (
  error: unknown,
  defaultMessage: string = "An error occurred"
): void => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const errorMessage = error.response?.data?.msg || defaultMessage;
    toast.error(errorMessage);
  } else {
    toast.error(defaultMessage);
  }
};

/**
 * API Service class for making authenticated requests
 */
export class ApiService {
  private client: AxiosInstance;

  constructor(token: string | null) {
    this.client = createApiClient(token);
  }

  /**
   * Update the authentication token
   */
  setToken(token: string | null): void {
    this.client = createApiClient(token);
  }

  /**
   * GET request - Returns response data directly (handles both { data: T } and direct T formats)
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T | ApiResponse<T>>(url, config);
    // Handle both response formats: { data: T } or direct T
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return (response.data as ApiResponse<T>).data;
    }
    return response.data as T;
  }

  /**
   * POST request - Returns response data directly (handles both { data: T } and direct T formats)
   */
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T | ApiResponse<T>>(url, data, config);
    // Handle both response formats: { data: T } or direct T
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return (response.data as ApiResponse<T>).data;
    }
    return response.data as T;
  }

  /**
   * PATCH request - Returns response data directly (handles both { data: T } and direct T formats)
   */
  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T | ApiResponse<T>>(url, data, config);
    // Handle both response formats: { data: T } or direct T
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return (response.data as ApiResponse<T>).data;
    }
    return response.data as T;
  }

  /**
   * PUT request - Returns response data directly (handles both { data: T } and direct T formats)
   */
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T | ApiResponse<T>>(url, data, config);
    // Handle both response formats: { data: T } or direct T
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return (response.data as ApiResponse<T>).data;
    }
    return response.data as T;
  }

  /**
   * DELETE request - Returns response data directly (handles both { data: T } and direct T formats)
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T | ApiResponse<T>>(url, config);
    // Handle both response formats: { data: T } or direct T
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return (response.data as ApiResponse<T>).data;
    }
    return response.data as T;
  }
}

export default ApiService;
