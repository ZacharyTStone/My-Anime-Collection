import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import i18n from "../translations/i18n";
import { apiClient } from "../utils/api";
import { handleApiError } from "../utils/handleApiError";
import { useAuthStore } from "../stores/authStore";
import type { User } from "../utils/types";
import { queryKeys } from "./keys";

interface AuthResponse {
  user: User;
  token: string;
}

export interface SetupUserVariables {
  currentUser: Partial<User>;
  endPoint: string;
  alertText: string;
}

export interface GoogleSSOVariables {
  credential: string;
  alertText: string;
}

export const useSetupUserMutation = () => {
  return useMutation({
    mutationFn: async ({ currentUser, endPoint }: SetupUserVariables) => {
      const { data } = await apiClient.post(`/auth/${endPoint}`, currentUser);
      return data as AuthResponse;
    },
    onSuccess: ({ user, token }, { alertText }) => {
      useAuthStore.getState().setAuth(user, token);
      toast.success(alertText);
    },
    onError: (error) => handleApiError(error, i18n.t("errors.auth_failed")),
  });
};

export const useGoogleSSOMutation = () => {
  return useMutation({
    mutationFn: async ({ credential }: GoogleSSOVariables) => {
      const { data } = await apiClient.post("/auth/google", { credential });
      return data as AuthResponse;
    },
    onSuccess: ({ user, token }, { alertText }) => {
      useAuthStore.getState().setAuth(user, token);
      toast.success(alertText);
    },
    onError: (error) => handleApiError(error, i18n.t("errors.google_sign_in_failed")),
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: async (currentUser: User) => {
      const { data } = await apiClient.patch("/auth/updateUser", currentUser);
      return data as AuthResponse;
    },
    onSuccess: ({ user, token }) => {
      useAuthStore.getState().setAuth(user, token);
      toast.success(i18n.t("profile.updated"));
    },
    onError: (error) => handleApiError(error, i18n.t("errors.update_user_failed")),
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await apiClient.delete("/auth/deleteUser");
    },
    onSuccess: () => {
      useAuthStore.getState().logoutUser();
      // The account is gone — drop every user-scoped cache
      queryClient.invalidateQueries({ queryKey: queryKeys.playlists });
      queryClient.invalidateQueries({ queryKey: ["animes"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.animeStats });
      queryClient.invalidateQueries({ queryKey: queryKeys.collection });
      toast.success(i18n.t("profile.deleted"));
    },
    onError: (error) => handleApiError(error, i18n.t("errors.delete_user_failed")),
  });
};
