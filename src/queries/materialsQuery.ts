import { useSession } from "@/contexts/auth.context";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponse";
import { useMutation } from "@tanstack/react-query";

export const useListMaterials = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<any>) => void;
  onError?: (error: any) => void;
}) => {
  const { session } = useSession();

  return useMutation({
    mutationFn: async () => {
      if (!session?.token) {
        throw new Error("No token available");
      }

      return api.get<any, ApiResponse<any>>("/materials", {
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