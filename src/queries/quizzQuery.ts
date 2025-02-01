import { useSession } from "@/contexts/auth.context";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponse";
import { useMutation } from "@tanstack/react-query";

export interface QuizResponse {
    id: number;
    materialParent: string;
    level: number;
    score: number;
}

export const useQuizList = ({
    onSuccess,
    onError,
}: {
    onSuccess?: (data: ApiResponse<QuizResponse[]>) => void;
    onError?: (error: any) => void;
}) => {
    const { session } = useSession();

    return useMutation({
        mutationFn: async (materialName: string) => {
            if (!session?.token) {
                throw new Error("No token available");
            }
            console.log("fetching letters for with level %s", materialName);

            return api.get<any, ApiResponse<QuizResponse[]>>(`/quizzes/detail${materialName}`, {
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