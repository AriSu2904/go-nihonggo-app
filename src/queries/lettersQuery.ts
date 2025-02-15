import { useSession } from "@/contexts/auth.context";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponse";
import { useMutation } from "@tanstack/react-query";

export interface LetterResponse {
    character: string;
    romaji: string;
    stroke: number;
    mean: string;
    level: number;
    secondImgUri: string;
    secondImgDetailUri: string;
    imgUri: string;
    audioUri: string;
    order: number;
}

export const useListLetters = ({
    onSuccess,
    onError,
}: {
    onSuccess?: (data: ApiResponse<LetterResponse[]>) => void;
    onError?: (error: any) => void;
}) => {
    const { session } = useSession();

    return useMutation({
        mutationFn: async ({ materialName, level }: { materialName: string; level: number }) => {
            if (!session?.token) {
                throw new Error("No token available");
            }
            console.log("fetching letters for with level %s %s", materialName, level);

            return api.get<any, ApiResponse<LetterResponse[]>>(`/letters/type/${materialName}?level=${level}`, {
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