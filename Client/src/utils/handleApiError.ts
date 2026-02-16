import axios from "axios";
import { toast } from "react-toastify";

/**
 * Centralized error handler for API calls.
 * - 401s are silently ignored (the apiClient interceptor handles logout).
 * - Other errors show a toast with the server message or a fallback.
 */
export function handleApiError(
  error: unknown,
  fallbackMsg = "Something went wrong"
): void {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) return;
    const msg = error.response?.data?.msg || fallbackMsg;
    toast.error(msg);
  } else {
    toast.error(fallbackMsg);
  }
}
