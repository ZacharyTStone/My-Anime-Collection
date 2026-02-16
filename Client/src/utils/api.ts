import axios from "axios";
import { API_BASE_URL } from "./constants";

const TOKEN_KEY = "token";

let _logoutHandler: (() => void) | null = null;

/** Called by authStore on init to wire up the 401 logout flow. */
export function registerLogoutHandler(handler: () => void) {
  _logoutHandler = handler;
}

const apiClient = axios.create({ baseURL: API_BASE_URL });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      _logoutHandler?.();
    }
    return Promise.reject(error);
  }
);

export { apiClient };
