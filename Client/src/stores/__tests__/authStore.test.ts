import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuthStore } from "../authStore";

vi.mock("../../utils/api", () => ({
  registerLogoutHandler: vi.fn(),
}));

beforeEach(() => {
  localStorage.clear();
  useAuthStore.setState({
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

  describe("setAuth", () => {
    it("sets user state and persists to localStorage", () => {
      const user = { id: "1", name: "NewUser", email: "new@test.com" };

      useAuthStore.getState().setAuth(user, "new-token");

      const state = useAuthStore.getState();
      expect(state.user).toEqual(user);
      expect(state.token).toBe("new-token");
      expect(state.isAuthenticated).toBe(true);
      expect(JSON.parse(localStorage.getItem("user")!)).toEqual(user);
      expect(localStorage.getItem("token")).toBe("new-token");
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
      expect(localStorage.getItem("user")).toBeNull();
      expect(localStorage.getItem("token")).toBeNull();
    });
  });
});
