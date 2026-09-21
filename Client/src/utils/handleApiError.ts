import axios from "axios";
import { toast } from "react-toastify";
import i18n from "../translations/i18n";

/**
 * Centralized error handler for API calls.
 * - 401s are silently ignored (the apiClient interceptor handles logout).
 * - 429s say so, rather than inheriting the caller's fallback.
 * - Other errors show a toast with the server message or a fallback.
 */
export function handleApiError(error: unknown, fallbackMsg = "Something went wrong"): void {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) return;
    // express-rate-limit answers with a bare string body, so there is no `msg`
    // to read and a throttled request would otherwise surface as the caller's
    // fallback — "Authentication failed" for a request that authenticated fine.
    if (error.response?.status === 429) {
      toast.error(i18n.t("errors.rate_limited"));
      return;
    }
    const msg = error.response?.data?.msg || fallbackMsg;
    toast.error(msg);
  } else {
    toast.error(fallbackMsg);
  }
}
