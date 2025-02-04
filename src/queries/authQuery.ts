import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponse";
import { useMutation } from "@tanstack/react-query";

interface AuthPayload {
  studentId: string;
  password: string;
}

export interface RegisterResponse {
  fullName: string;
  studentId: string;
}

export interface LoginResponse {
  studentId: string;
  role: string;
  nickname: string;
  token: string;
  refreshToken: string;
}

export const useRegister = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<RegisterResponse>) => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (payload: AuthPayload) => {
      return api.post<any, ApiResponse<RegisterResponse>>("/register", payload);
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      onError && onError(error);
    },
  });
};

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<LoginResponse>) => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (payload: AuthPayload) => {
      return api.post<any, ApiResponse<LoginResponse>>("/login", payload);
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      onError && onError(error);
    },
  });
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await api.post<any, ApiResponse<LoginResponse>>("/auth/refresh", {
    refreshToken,
  });
  if (response) {
    console.log(response);
  }
  throw new Error("Failed to refresh token");
};