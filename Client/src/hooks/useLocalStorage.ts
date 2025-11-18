import { useState, useEffect, useCallback } from "react";

/**
 * Interface for localStorage options
 */
export interface UseLocalStorageOptions {
    defaultValue?: any;
    serializer?: {
        parse: (value: string) => any;
        stringify: (value: any) => string;
    };
}

/**
 * Custom hook for localStorage with React state synchronization
 * @param key - localStorage key
 * @param options - Configuration options
 * @returns [value, setValue, removeValue] tuple
 */
export const useLocalStorage = <T>(
    key: string,
    options: UseLocalStorageOptions = {}
) => {
    const { defaultValue, serializer = JSON } = options;

    // Get initial value from localStorage or use default
    const getStoredValue = useCallback((): T => {
        try {
            const item = localStorage.getItem(key);
            if (item === null) {
                return defaultValue;
            }
            return serializer.parse(item);
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return defaultValue;
        }
    }, [key, defaultValue, serializer]);

    const [storedValue, setStoredValue] = useState<T>(getStoredValue);

    // Update localStorage when state changes
    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);

                if (valueToStore === undefined || valueToStore === null) {
                    localStorage.removeItem(key);
                } else {
                    localStorage.setItem(key, serializer.stringify(valueToStore));
                }
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key, serializer, storedValue]
    );

    // Remove value from localStorage
    const removeValue = useCallback(() => {
        try {
            localStorage.removeItem(key);
            setStoredValue(defaultValue);
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, defaultValue]);

    // Listen for changes to localStorage from other tabs/windows
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    setStoredValue(serializer.parse(e.newValue));
                } catch (error) {
                    console.warn(`Error parsing localStorage value for key "${key}":`, error);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key, serializer]);

    return [storedValue, setValue, removeValue] as const;
};

/**
 * Custom hook for storing and retrieving user data
 * @returns [user, setUser, removeUser] tuple
 */
export const useUserStorage = () => {
    return useLocalStorage("user", {
        defaultValue: null,
    });
};

/**
 * Custom hook for storing and retrieving authentication token
 * @returns [token, setToken, removeToken] tuple
 */
export const useTokenStorage = () => {
    return useLocalStorage("token", {
        defaultValue: null,
    });
};

/**
 * Custom hook for storing and retrieving theme preference
 * @returns [theme, setTheme, removeTheme] tuple
 */
export const useThemeStorage = () => {
    return useLocalStorage<"light" | "dark">("theme", {
        defaultValue: "light",
    });
};

/**
 * Custom hook for storing and retrieving language preference
 * @returns [language, setLanguage, removeLanguage] tuple
 */
export const useLanguageStorage = () => {
    return useLocalStorage<"en" | "jp">("language", {
        defaultValue: "en",
    });
};
