import { create } from "zustand";
import { toast } from "react-toastify";
import { User } from "../utils/types";
import { apiClient, registerLogoutHandler } from "../utils/api";
import { handleApiError } from "../utils/handleApiError";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const getStoredUser = (): User | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
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
  isLoading: boolean;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setupUser: (params: {
    currentUser: Partial<User>;
    endPoint: string;
    alertText: string;
  }) => Promise<void>;
  logoutUser: () => void;
  updateUser: (currentUser: User) => Promise<void>;
  deleteUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isLoading: false,
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),

  setupUser: async ({ currentUser, endPoint, alertText }) => {
    set({ isLoading: true });
    try {
      const { data } = await apiClient.post(`/auth/${endPoint}`, currentUser);
      const { user, token } = data;
      addUserToLocalStorage(user, token);
      set({
        isLoading: false,
        user,
        token,
        isAuthenticated: true,
      });
      toast.success(alertText);
    } catch (error: unknown) {
      set({ isLoading: false });
      handleApiError(error, "Authentication failed");
    }
  },

  logoutUser: () => {
    removeUserFromLocalStorage();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  updateUser: async (currentUser: User) => {
    set({ isLoading: true });
    try {
      const { data } = await apiClient.patch("/auth/updateUser", currentUser);
      const { user, token } = data;
      addUserToLocalStorage(user, token);
      set({
        isLoading: false,
        user,
        token,
        isAuthenticated: true,
      });
      toast.success("User Updated!");
    } catch (error: unknown) {
      set({ isLoading: false });
      handleApiError(error, "Failed to update user");
    }
  },

  deleteUser: async () => {
    set({ isLoading: true });
    try {
      await apiClient.delete("/auth/deleteUser");
      get().logoutUser();
      toast.success("User Deleted!");
    } catch (error: unknown) {
      set({ isLoading: false });
      handleApiError(error, "Failed to delete user");
    }
  },
}));

registerLogoutHandler(() => useAuthStore.getState().logoutUser());
