import { apiClient } from "./axiosInstance";
import { API_ENDPOINTS } from "./endpoints";

/**
 * Interface for user data
 */
export interface UserData {
    id?: string;
    name: string;
    email: string;
    password?: string;
    theme?: "light" | "dark";
    language?: "en" | "jp";
    isDemo?: boolean;
}

/**
 * Interface for login credentials
 */
export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * Interface for registration data
 */
export interface RegistrationData {
    name: string;
    email: string;
    password: string;
    theme?: "light" | "dark";
    language?: "en" | "jp";
    isDemo?: boolean;
}

/**
 * Interface for auth response
 */
export interface AuthResponse {
    user: UserData;
    token: string;
}

/**
 * Interface for update user data
 */
export interface UpdateUserData {
    name: string;
    email: string;
    theme: "light" | "dark";
}

/**
 * Auth service class
 */
export class AuthService {
    /**
     * Login user
     * @param credentials - Login credentials
     * @returns Promise with user data and token
     */
    static async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    }

    /**
     * Register new user
     * @param userData - Registration data
     * @returns Promise with user data and token
     */
    static async register(userData: RegistrationData): Promise<AuthResponse> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
        return response.data;
    }

    /**
     * Update user information
     * @param userData - Updated user data
     * @returns Promise with updated user data and token
     */
    static async updateUser(userData: UpdateUserData): Promise<AuthResponse> {
        const response = await apiClient.patch(API_ENDPOINTS.AUTH.UPDATE_USER, userData);
        return response.data;
    }

    /**
     * Delete user account
     * @returns Promise with deletion result
     */
    static async deleteUser(): Promise<{ message: string }> {
        const response = await apiClient.delete(API_ENDPOINTS.AUTH.DELETE_USER);
        return response.data;
    }

    /**
     * Logout user (client-side only)
     * @returns Promise that resolves immediately
     */
    static async logout(): Promise<void> {
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Return resolved promise
        return Promise.resolve();
    }

    /**
     * Check if user is authenticated
     * @returns boolean indicating authentication status
     */
    static isAuthenticated(): boolean {
        const token = localStorage.getItem("token");
        return !!token;
    }

    /**
     * Get stored user data
     * @returns User data from localStorage or null
     */
    static getStoredUser(): UserData | null {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    }

    /**
     * Store user data and token
     * @param userData - User data to store
     * @param token - Authentication token
     */
    static storeAuthData(userData: UserData, token: string): void {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    }
}
