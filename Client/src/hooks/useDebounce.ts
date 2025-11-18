import { useState, useEffect, useCallback } from "react";

/**
 * Interface for useDebounce options
 */
export interface UseDebounceOptions {
    delay?: number;
    leading?: boolean;
    trailing?: boolean;
}

/**
 * Custom hook for debouncing values
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @param options - Additional debounce options
 * @returns Debounced value
 */
export const useDebounce = <T>(
    value: T,
    delay: number = 300,
    options: UseDebounceOptions = {}
): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const { leading = false, trailing = true } = options;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (leading && debouncedValue !== value) {
            setDebouncedValue(value);
        } else if (trailing) {
            timeoutId = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [value, delay, leading, trailing, debouncedValue]);

    return debouncedValue;
};

/**
 * Custom hook for debouncing callback functions
 * @param callback - Callback function to debounce
 * @param delay - Delay in milliseconds
 * @param deps - Dependencies array for the callback
 * @returns Debounced callback function
 */
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
    callback: T,
    delay: number = 300,
    deps: React.DependencyList = []
): T => {
    const [debouncedCallback, setDebouncedCallback] = useState<T>(callback);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedCallback(() => callback);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [callback, delay, ...deps]);

    return debouncedCallback;
};

/**
 * Custom hook for debouncing async operations
 * @param asyncCallback - Async callback function to debounce
 * @param delay - Delay in milliseconds
 * @param deps - Dependencies array for the callback
 * @returns Debounced async callback function
 */
export const useDebouncedAsyncCallback = <T extends (...args: any[]) => Promise<any>>(
    asyncCallback: T,
    delay: number = 300,
    deps: React.DependencyList = []
): T => {
    const [debouncedCallback, setDebouncedCallback] = useState<T>(asyncCallback);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedCallback(() => asyncCallback);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [asyncCallback, delay, ...deps]);

    return debouncedCallback;
};
