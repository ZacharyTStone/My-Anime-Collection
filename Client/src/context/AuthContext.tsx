import React, {
  useReducer,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { ACTIONS } from "./actions";

// Types and Interfaces
interface User {
  id: string;
  name: string;
  email: string;
  isDemo?: boolean;
  theme?: string;
}

interface AuthState {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  displayAlert: () => void;
  clearAlert: () => void;
  setupUser: (params: {
    currentUser: Partial<User>;
    endPoint: string;
    alertText: string;
  }) => Promise<void>;
  logoutUser: () => Promise<void>;
  updateUser: (currentUser: User) => Promise<void>;
  deleteUser: (currentUser: User) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Constants
const TOKEN_KEY = "token";
const USER_KEY = "user";
const API_BASE_URL = "/api/v1";

// Initial state
const getInitialAuthState = (): AuthState => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);

  return {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token,
    isAuthenticated: !!token,
  };
};

export const initialAuthState = getInitialAuthState();

// Auth reducer
const authReducer = (state: AuthState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ACTIONS.DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };
    case ACTIONS.CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    case ACTIONS.SETUP_USER_BEGIN:
      return { ...state, isLoading: true };
    case ACTIONS.SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: !!action.payload.token,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.alertText,
      };
    case ACTIONS.SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case ACTIONS.LOGOUT_USER:
      return {
        ...getInitialAuthState(),
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case ACTIONS.UPDATE_USER_BEGIN:
      return { ...state, isLoading: true };
    case ACTIONS.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token || state.token,
        user: action.payload.user || state.user,
        isAuthenticated: !!(action.payload.token || state.token),
      };
    case ACTIONS.UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case ACTIONS.DELETE_USER_BEGIN:
      return { ...state, isLoading: true };
    case ACTIONS.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ACTIONS.DELETE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case ACTIONS.UPDATE_AUTHENTICATION_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
      };
    default:
      return state;
  }
};

// Context
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that manages authentication state
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, getInitialAuthState());

  // Utility functions
  const removeUserFromLocalStorage = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  // Create axios instance with interceptors
  const createAxiosInstance = useCallback(
    (token: string | null): AxiosInstance => {
      const instance = axios.create({
        baseURL: API_BASE_URL,
      });

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

      instance.interceptors.response.use(
        (response: AxiosResponse) => {
          return response;
        },
        (error: AxiosError) => {
          if (error.response?.status === 401) {
            removeUserFromLocalStorage();
            dispatch({ type: ACTIONS.LOGOUT_USER, payload: {} });
          }
          return Promise.reject(error);
        }
      );

      return instance;
    },
    [removeUserFromLocalStorage, dispatch]
  );

  // Memoized axios instance
  const authFetch = useMemo(
    () => createAxiosInstance(state.token),
    [state.token, createAxiosInstance]
  );

  // Utility functions
  const addUserToLocalStorage = useCallback(
    ({ user, token }: { user: User; token: string }) => {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    },
    []
  );

  // Alert functions
  const displayAlert = useCallback(() => {
    dispatch({ type: ACTIONS.DISPLAY_ALERT, payload: {} });
    clearAlert();
  }, []);

  const clearAlert = useCallback(() => {
    setTimeout(() => {
      dispatch({ type: ACTIONS.CLEAR_ALERT, payload: {} });
    }, 3000);
  }, []);

  // User management functions
  const setupUser = useCallback(
    async ({
      currentUser,
      endPoint,
      alertText,
    }: {
      currentUser: Partial<User>;
      endPoint: string;
      alertText: string;
    }) => {
      try {
        const { data } = await authFetch.post(`/auth/${endPoint}`, currentUser);
        const { user, token } = data;
        addUserToLocalStorage({ user, token });
        dispatch({
          type: ACTIONS.SETUP_USER_SUCCESS,
          payload: { user, token, alertText },
        });
        toast.success(alertText);
      } catch (error: any) {
        dispatch({
          type: ACTIONS.SETUP_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
        toast.error(error.response.data.msg);
      }
      clearAlert();
    },
    [authFetch, addUserToLocalStorage, clearAlert]
  );

  const logoutUser = useCallback(async () => {
    removeUserFromLocalStorage();
    dispatch({ type: ACTIONS.LOGOUT_USER, payload: {} });
  }, [removeUserFromLocalStorage]);

  const updateUser = useCallback(
    async (currentUser: User) => {
      try {
        const { data } = await authFetch.patch("/auth/updateUser", currentUser);
        const { user, token } = data;
        addUserToLocalStorage({ user, token });
        dispatch({
          type: ACTIONS.UPDATE_USER_SUCCESS,
          payload: { user, token },
        });
        toast.success("User Updated!");
      } catch (error: any) {
        if (error.response.status !== 401) {
          dispatch({
            type: ACTIONS.UPDATE_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
          toast.error(error.response.data.msg);
        }
      }
      clearAlert();
    },
    [authFetch, addUserToLocalStorage, clearAlert]
  );

  const deleteUser = useCallback(
    async (currentUser: User) => {
      try {
        await authFetch.delete("/auth/deleteUser");
        logoutUser();
        toast.success("User Deleted!");
      } catch (error: any) {
        if (error.response.status !== 401) {
          dispatch({
            type: ACTIONS.DELETE_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
          toast.error(error.response.data.msg);
        }
      }
      clearAlert();
    },
    [authFetch, logoutUser, clearAlert]
  );

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      ...state,
      isAuthenticated: !!state.token,
      displayAlert,
      clearAlert,
      setupUser,
      logoutUser,
      updateUser,
      deleteUser,
    }),
    [
      state,
      displayAlert,
      clearAlert,
      setupUser,
      logoutUser,
      updateUser,
      deleteUser,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * @throws {Error} When used outside of AuthProvider
 */
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
