import React, {
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import { ACTIONS } from "./actions";
import { TOKEN_KEY, USER_KEY } from "../utils/constants";
import { createApiClient } from "../utils/api";

// Types and Interfaces
interface User {
  id: string;
  name: string;
  email: string;
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
    currentUser: User;
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
interface AuthAction {
  type: string;
  payload?: {
    token?: string;
    user?: User;
    alertText?: string;
    msg?: string;
    isAuthenticated?: boolean;
  };
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
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
        token: action.payload?.token || null,
        user: action.payload?.user || null,
        isAuthenticated: !!action.payload?.token,
        showAlert: true,
        alertType: "success",
        alertText: action.payload?.alertText || "",
      };
    case ACTIONS.SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload?.msg || "An error occurred",
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
        token: action.payload?.token || state.token,
        user: action.payload?.user || state.user,
        isAuthenticated: !!(action.payload?.token || state.token),
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
        alertText: action.payload?.msg || "Error deleting user",
      };
    case ACTIONS.UPDATE_AUTHENTICATION_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload?.isAuthenticated ?? state.isAuthenticated,
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

  // Handle 401 unauthorized errors
  const handleUnauthorized = useCallback(() => {
    removeUserFromLocalStorage();
    dispatch({ type: ACTIONS.LOGOUT_USER, payload: {} });
  }, [removeUserFromLocalStorage, dispatch]);

  // Memoized axios instance using centralized createApiClient
  const authFetch = useMemo(
    () => createApiClient(state.token, { onUnauthorized: handleUnauthorized }),
    [state.token, handleUnauthorized]
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
      currentUser: User;
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
        const errorMessage = error.response?.data?.msg || "An error occurred";
        dispatch({
          type: ACTIONS.SETUP_USER_ERROR,
          payload: { msg: errorMessage },
        });
        toast.error(errorMessage);
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
        if (error.response?.status !== 401) {
          const errorMessage = error.response?.data?.msg || "Error updating user";
          dispatch({
            type: ACTIONS.UPDATE_USER_ERROR,
            payload: { msg: errorMessage },
          });
          toast.error(errorMessage);
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
        if (error.response?.status !== 401) {
          const errorMessage = error.response?.data?.msg || "Error deleting user";
          dispatch({
            type: ACTIONS.DELETE_USER_ERROR,
            payload: { msg: errorMessage },
          });
          toast.error(errorMessage);
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
