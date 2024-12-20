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
      return api.post<any, ApiResponse<RegisterResponse>>("/auth/register", payload);
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
      return api.post<any, ApiResponse<LoginResponse>>("/auth/login", payload);
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      onError && onError(error);
    },
  });
};
