/**
 * Custom Hooks Index
 * 
 * Centralized exports for all custom hooks
 * 
 * @example
 * ```typescript
 * import { useDebounce, useLocalStorage, useUserStorage } from '../hooks';
 * ```
 */

// Debounce hooks
export {
    useDebounce,
    useDebouncedCallback,
    useDebouncedAsyncCallback,
} from './useDebounce';

// Local storage hooks
export {
    useLocalStorage,
    useUserStorage,
    useTokenStorage,
    useThemeStorage,
    useLanguageStorage,
} from './useLocalStorage';

// Type exports
export type { UseDebounceOptions } from './useDebounce';
export type { UseLocalStorageOptions } from './useLocalStorage';
