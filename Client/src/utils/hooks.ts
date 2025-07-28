import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
import { DESKTOP, LARGE_DESKTOP, TABLET } from "./constants";
import { useNavigate } from "react-router-dom";

const useInViewAnimation = (threshold = 0.5) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return { ref, inView };
};

const useMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: TABLET });
  return isMobile;
};

const useTablet = () => {
  const isTablet = useMediaQuery({ minWidth: TABLET, maxWidth: DESKTOP });
  return isTablet;
};

const useDesktop = () => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP });
  return isDesktop;
};

const useLargeDesktop = () => {
  const isLargeDesktop = useMediaQuery({ minWidth: LARGE_DESKTOP });
  return isLargeDesktop;
};

const useLoadingState = (isLoading: boolean) => {
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setLocalLoading(true);
    } else {
      const timer = setTimeout(() => {
        setLocalLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const withLoading = useCallback(
    (fn: (...args: any[]) => void) =>
      (...args: any[]) => {
        if (!localLoading) {
          fn(...args);
        }
      },
    [localLoading]
  );

  return {
    isLoading: localLoading,
    withLoading,
  };
};

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
};

const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return { goTo, goBack };
};

export {
  useInViewAnimation,
  useMobile,
  useTablet,
  useDesktop,
  useLargeDesktop,
  useLoadingState,
  useDebounce,
  useLocalStorage,
  useNavigation,
};
