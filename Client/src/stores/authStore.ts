import { create } from "zustand";
import { User } from "../utils/types";
import { registerLogoutHandler } from "../utils/api";

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
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logoutUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),

  setAuth: (user, token) => {
    addUserToLocalStorage(user, token);
    set({ user, token, isAuthenticated: true });
  },

  logoutUser: () => {
    removeUserFromLocalStorage();
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

registerLogoutHandler(() => useAuthStore.getState().logoutUser());
