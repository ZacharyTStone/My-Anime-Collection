import React, {
  useReducer,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { ACTIONS } from "./actions";
import { AuthService, UserData, LoginCredentials, RegistrationData, UpdateUserData } from "../api/authService";
import { useUserStorage, useTokenStorage } from "../hooks/useLocalStorage";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../config/constants";

// Types and Interfaces
interface AuthState {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  displayAlert: () => void;
  clearAlert: () => void;
  setupUser: (params: {
    currentUser: UserData;
    endPoint: string;
    alertText: string;
  }) => Promise<void>;
  logoutUser: () => Promise<void>;
  updateUser: (currentUser: UserData) => Promise<void>;
  deleteUser: (currentUser: UserData) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Initial state
const getInitialAuthState = (): AuthState => {
  return {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: null,
    token: null,
    isAuthenticated: false,
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
  const [storedUser, setStoredUser, removeStoredUser] = useUserStorage();
  const [storedToken, setStoredToken, removeStoredToken] = useTokenStorage();

  // Initialize state from localStorage
  useEffect(() => {
    if (storedUser && storedToken) {
      dispatch({
        type: ACTIONS.SETUP_USER_SUCCESS,
        payload: { user: storedUser, token: storedToken, alertText: "Welcome back!" },
      });
    }
  }, [storedUser, storedToken]);

  // Utility functions
  const addUserToLocalStorage = useCallback(
    ({ user, token }: { user: UserData; token: string }) => {
      setStoredUser(user);
      setStoredToken(token);
    },
    [setStoredUser, setStoredToken]
  );

  const removeUserFromLocalStorage = useCallback(() => {
    removeStoredUser();
    removeStoredToken();
  }, [removeStoredUser, removeStoredToken]);

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
      currentUser: UserData;
      endPoint: string;
      alertText: string;
    }) => {
      dispatch({ type: ACTIONS.SETUP_USER_BEGIN, payload: {} });

      try {
        let response;

        if (endPoint === "login") {
          response = await AuthService.login(currentUser as LoginCredentials);
        } else if (endPoint === "register") {
          response = await AuthService.register(currentUser as RegistrationData);
        } else {
          throw new Error("Invalid endpoint");
        }

        const { user, token } = response;
        addUserToLocalStorage({ user, token });
        dispatch({
          type: ACTIONS.SETUP_USER_SUCCESS,
          payload: { user, token, alertText },
        });
        toast.success(alertText);
      } catch (error: any) {
        const errorMessage = error.response?.data?.msg || ERROR_MESSAGES.UNKNOWN_ERROR;
        dispatch({
          type: ACTIONS.SETUP_USER_ERROR,
          payload: { msg: errorMessage },
        });
        toast.error(errorMessage);
      }
      clearAlert();
    },
    [addUserToLocalStorage, clearAlert]
  );

  const logoutUser = useCallback(async () => {
    await AuthService.logout();
    removeUserFromLocalStorage();
    dispatch({ type: ACTIONS.LOGOUT_USER, payload: {} });
  }, [removeUserFromLocalStorage]);

  const updateUser = useCallback(
    async (currentUser: UserData) => {
      dispatch({ type: ACTIONS.UPDATE_USER_BEGIN, payload: {} });

      try {
        const response = await AuthService.updateUser(currentUser as UpdateUserData);
        const { user, token } = response;
        addUserToLocalStorage({ user, token });
        dispatch({
          type: ACTIONS.UPDATE_USER_SUCCESS,
          payload: { user, token },
        });
        toast.success(SUCCESS_MESSAGES.USER_UPDATED);
      } catch (error: any) {
        if (error.response?.status !== 401) {
          const errorMessage = error.response?.data?.msg || ERROR_MESSAGES.UNKNOWN_ERROR;
          dispatch({
            type: ACTIONS.UPDATE_USER_ERROR,
            payload: { msg: errorMessage },
          });
          toast.error(errorMessage);
        }
      }
      clearAlert();
    },
    [addUserToLocalStorage, clearAlert]
  );

  const deleteUser = useCallback(
    async (currentUser: UserData) => {
      dispatch({ type: ACTIONS.DELETE_USER_BEGIN, payload: {} });

      try {
        await AuthService.deleteUser();
        await logoutUser();
        toast.success("User Deleted!");
      } catch (error: any) {
        if (error.response?.status !== 401) {
          const errorMessage = error.response?.data?.msg || ERROR_MESSAGES.UNKNOWN_ERROR;
          dispatch({
            type: ACTIONS.DELETE_USER_ERROR,
            payload: { msg: errorMessage },
          });
          toast.error(errorMessage);
        }
      }
      clearAlert();
    },
    [logoutUser, clearAlert]
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
