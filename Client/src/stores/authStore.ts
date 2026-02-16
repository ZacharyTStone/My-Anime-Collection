import { create } from "zustand";
import { toast } from "react-toastify";
import { User } from "../utils/types";
import { apiClient, registerLogoutHandler } from "../utils/api";
import { handleApiError } from "../utils/handleApiError";

const TOKEN_KEY = "token";
const USER_KEY = "user";

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
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  displayAlert: () => void;
  clearAlert: () => void;
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
    try {
      const { data } = await apiClient.post(`/auth/${endPoint}`, currentUser);
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
    } catch (error: unknown) {
      set({ isLoading: false });
      handleApiError(error, "Authentication failed");
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

// Wire up the 401 interceptor to call logoutUser
registerLogoutHandler(() => useAuthStore.getState().logoutUser());
