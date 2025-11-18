import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

/**
 * Interface for API configuration
 */
export interface ApiConfig {
    baseURL: string;
    timeout: number;
}

/**
 * Default API configuration
 */
const defaultConfig: ApiConfig = {
    baseURL: "/api/v1",
    timeout: 10000,
};

/**
 * Creates a configured axios instance
 * @param config - Optional configuration overrides
 * @returns Configured axios instance
 */
export const createAxiosInstance = (config: Partial<ApiConfig> = {}): AxiosInstance => {
    const finalConfig = { ...defaultConfig, ...config };

    const instance = axios.create(finalConfig);

    // Request interceptor
    instance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            // Add auth token if available
            const token = localStorage.getItem("token");
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error: AxiosError) => {
            // Handle 401 errors globally
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                // Redirect to login or dispatch logout action
                window.location.href = "/";
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

/**
 * Default axios instance for the application
 */
export const apiClient = createAxiosInstance();

/**
 * Creates an axios instance with custom token
 * @param token - Authentication token
 * @returns Axios instance with token
 */
export const createAuthenticatedInstance = (token: string): AxiosInstance => {
    return createAxiosInstance({
        baseURL: defaultConfig.baseURL,
        timeout: defaultConfig.timeout,
    });
};
