import { useSession } from "@/contexts/auth.context";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponse";
import { useMutation } from "@tanstack/react-query";

export interface QuizResponse {
    id: number;
    materialParent: string;
    level: number;
    score: number;
    type: string;
}

export interface QuizAndQuestions {
    id: string;
    materialParent: string;
    level: number;
    score: number;
    total: number;
    questions: Questions[];
}

export interface Questions {
    section: string;
    totalPerSection: number;
    groupedQuestion: GroupedQuestion[];
}

export interface GroupedQuestion {
    id: string;
    questionImage: string;
    questionAudio: string;
    questionImgSecond: string;
    questionImgDetail: string;
    level: number;
    section: string;
    answer: string;
    options: string[];
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
            console.log("fetching letters for %s", materialName);

            return api.get<any, ApiResponse<QuizResponse[]>>(`/quiz/${materialName.toLowerCase()}`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
            });
        },
        onSuccess: (data) => {
            onSuccess && onSuccess(data);
        },
        onError: (error) => {
            console.log("error", error);
            onError && onError(error);
        },
    });
};

export const useQuestionByQuizId = ({
    onSuccess,
    onError,
}: {
    onSuccess?: (data: ApiResponse<QuizAndQuestions>) => void;
    onError?: (error: any) => void;
}) => {
    const { session } = useSession();

    return useMutation({
        mutationFn: async ({ materialName, id }: { materialName: string, id: string }) => {
            if (!session?.token) {
                throw new Error("No token available");
            }
            console.log("fetching quiz %s with id %s", materialName, id);

            return api.get<any, ApiResponse<QuizAndQuestions>>(`/quiz/questions/${materialName.toLowerCase()}?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
            });
        },
        onSuccess: (data) => {
            onSuccess && onSuccess(data);
        },
        onError: (error) => {
            console.log("error", error);
            onError && onError(error);
        },
    });
};