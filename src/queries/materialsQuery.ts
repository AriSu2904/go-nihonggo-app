import { useSession } from "@/contexts/auth.context";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponse";
import { useMutation } from "@tanstack/react-query";

export interface MaterialResponse {
  order: number;
  original: string;
  name: string; description: string; createdBy: string; createdAt: string;
}


export const useListMaterials = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<MaterialResponse[]>) => void;
  onError?: (error: any) => void;
}) => {
  const { session } = useSession();

  return useMutation({
    mutationFn: async () => {
      if (!session?.token) {
        throw new Error("No token available");
      }

      return api.get<any, ApiResponse<MaterialResponse[]>>("/materials", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      onError && onError(error);
    },
  });
};

export const useMaterialContent = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<MaterialResponse[]>) => void;
  onError?: (error: any) => void;
}) => {
  const { session } = useSession();

  return useMutation({
    mutationFn: async (materialName: string) => {
      if (!session?.token) {
        throw new Error("No token available");
      }

      return api.get<any, ApiResponse<MaterialResponse[]>>(`/contents/${materialName}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      onError && onError(error);
    },
  });
};