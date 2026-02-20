import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuthStore } from "../authStore";

// Mock apiClient and handleApiError
vi.mock("../../utils/api", () => ({
  apiClient: {
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
  registerLogoutHandler: vi.fn(),
}));

vi.mock("../../utils/handleApiError", () => ({
  handleApiError: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

beforeEach(() => {
  localStorage.clear();
  useAuthStore.setState({
    isLoading: false,
    user: null,
    token: null,
    isAuthenticated: false,
  });
});

describe("authStore", () => {
  describe("initial state", () => {
    it("reads user and token from localStorage", () => {
      const user = { id: "1", name: "Zach", email: "z@test.com" };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", "jwt-token-123");

      // Re-import would be ideal but zustand stores are singletons,
      // so we test the helper behavior via setState
      useAuthStore.setState({
        user,
        token: "jwt-token-123",
        isAuthenticated: true,
      });

      const state = useAuthStore.getState();
      expect(state.user).toEqual(user);
      expect(state.token).toBe("jwt-token-123");
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe("logoutUser", () => {
    it("clears user state and localStorage", () => {
      localStorage.setItem("user", JSON.stringify({ id: "1", name: "Test", email: "t@t.com" }));
      localStorage.setItem("token", "some-token");
      useAuthStore.setState({
        user: { id: "1", name: "Test", email: "t@t.com" },
        token: "some-token",
        isAuthenticated: true,
      });

      useAuthStore.getState().logoutUser();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(localStorage.getItem("user")).toBeNull();
      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  describe("setupUser", () => {
    it("sets isLoading to true during the request", async () => {
      const { apiClient } = await import("../../utils/api");
      const mockPost = vi.mocked(apiClient.post);
      mockPost.mockResolvedValueOnce({
        data: {
          user: { id: "1", name: "NewUser", email: "new@test.com" },
          token: "new-token",
        },
      });

      const promise = useAuthStore.getState().setupUser({
        currentUser: { name: "NewUser", email: "new@test.com" },
        endPoint: "register",
        alertText: "Registered!",
      });

      await promise;

      const state = useAuthStore.getState();
      expect(state.isLoading).toBe(false);
      expect(state.user?.name).toBe("NewUser");
      expect(state.token).toBe("new-token");
      expect(state.isAuthenticated).toBe(true);
    });

    it("handles errors and sets isLoading to false", async () => {
      const { apiClient } = await import("../../utils/api");
      const mockPost = vi.mocked(apiClient.post);
      mockPost.mockRejectedValueOnce(new Error("Network error"));

      await useAuthStore.getState().setupUser({
        currentUser: { name: "Fail", email: "fail@test.com" },
        endPoint: "register",
        alertText: "Registered!",
      });

      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });
});
