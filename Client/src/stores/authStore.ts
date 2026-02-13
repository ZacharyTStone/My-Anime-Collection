import { create } from "zustand";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { User } from "../utils/types";

const TOKEN_KEY = "token";
const USER_KEY = "user";
const API_BASE_URL = "/api/v1";

const getStoredUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const addUserToLocalStorage = (user: User, token: string) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

interface AuthStore {
  // State
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  // Actions
  displayAlert: () => void;
  clearAlert: () => void;
  setupUser: (params: {
    currentUser: Partial<User>;
    endPoint: string;
    alertText: string;
  }) => Promise<void>;
  logoutUser: () => void;
  updateUser: (currentUser: User) => Promise<void>;
  deleteUser: (currentUser: User) => Promise<void>;
}

const createAuthFetch = (token: string | null, logout: () => void): AxiosInstance => {
  const instance = axios.create({ baseURL: API_BASE_URL });

  instance.interceptors.request.use(
    (config) => {
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        removeUserFromLocalStorage();
        logout();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),

  displayAlert: () => {
    set({ showAlert: true, alertType: "danger", alertText: "Please provide all values!" });
    setTimeout(() => {
      set({ showAlert: false, alertType: "", alertText: "" });
    }, 3000);
  },

  clearAlert: () => {
    setTimeout(() => {
      set({ showAlert: false, alertType: "", alertText: "" });
    }, 3000);
  },

  setupUser: async ({ currentUser, endPoint, alertText }) => {
    set({ isLoading: true });
    const authFetch = createAuthFetch(get().token, get().logoutUser);
    try {
      const { data } = await authFetch.post(`/auth/${endPoint}`, currentUser);
      const { user, token } = data;
      addUserToLocalStorage(user, token);
      set({
        isLoading: false,
        user,
        token,
        isAuthenticated: true,
        showAlert: true,
        alertType: "success",
        alertText,
      });
      toast.success(alertText);
    } catch (error: any) {
      set({
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: error.response.data.msg,
      });
      toast.error(error.response.data.msg);
    }
    get().clearAlert();
  },

  logoutUser: () => {
    removeUserFromLocalStorage();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      showAlert: false,
      alertText: "",
      alertType: "",
    });
  },

  updateUser: async (currentUser: User) => {
    set({ isLoading: true });
    const authFetch = createAuthFetch(get().token, get().logoutUser);
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, token } = data;
      addUserToLocalStorage(user, token);
      set({
        isLoading: false,
        user,
        token,
        isAuthenticated: true,
      });
      toast.success("User Updated!");
    } catch (error: any) {
      set({ isLoading: false });
      if (error.response?.status !== 401) {
        toast.error(error.response.data.msg);
      }
    }
  },

  deleteUser: async (_currentUser: User) => {
    set({ isLoading: true });
    const authFetch = createAuthFetch(get().token, get().logoutUser);
    try {
      await authFetch.delete("/auth/deleteUser");
      get().logoutUser();
      toast.success("User Deleted!");
    } catch (error: any) {
      set({ isLoading: false });
      if (error.response?.status !== 401) {
        toast.error(error.response.data.msg);
      }
    }
  },
}));
