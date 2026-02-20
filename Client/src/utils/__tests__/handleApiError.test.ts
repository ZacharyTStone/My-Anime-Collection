import { describe, it, expect, vi, beforeEach } from "vitest";
import { handleApiError } from "../handleApiError";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { toast } from "react-toastify";

vi.mock("react-toastify", () => ({
  toast: { error: vi.fn() },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

function makeAxiosError(status: number, msg?: string): AxiosError {
  const error = new AxiosError(
    "Request failed",
    "ERR_BAD_RESPONSE",
    undefined,
    undefined,
    {
      status,
      data: msg ? { msg } : {},
      statusText: "Error",
      headers: {},
      config: { headers: new AxiosHeaders() },
    }
  );
  return error;
}

describe("handleApiError", () => {
  it("silently ignores 401 errors", () => {
    handleApiError(makeAxiosError(401));
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("shows server message for non-401 axios errors", () => {
    handleApiError(makeAxiosError(400, "Bad request body"));
    expect(toast.error).toHaveBeenCalledWith("Bad request body");
  });

  it("shows fallback message when server msg is missing", () => {
    handleApiError(makeAxiosError(500), "Server exploded");
    expect(toast.error).toHaveBeenCalledWith("Server exploded");
  });

  it("shows fallback for non-axios errors", () => {
    handleApiError(new Error("network down"), "Oops");
    expect(toast.error).toHaveBeenCalledWith("Oops");
  });

  it("uses default fallback when none provided for non-axios errors", () => {
    handleApiError(new Error("something"));
    expect(toast.error).toHaveBeenCalledWith("Something went wrong");
  });
});
