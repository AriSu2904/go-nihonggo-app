import { useSession } from "@/contexts/auth.context";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponse";
import { useMutation } from "@tanstack/react-query";

export interface QuizRequest {
  quizId: string;
  materialParent: string;
  level: number;
  section: string;
}

export interface QuizResponse {
  successInquiry: boolean;
}

export interface TargetAnswers {
  questionId: string;
  targetAnswer: string;
}

export interface SubmitQuizRequest {
  quizId: string;
  answers: TargetAnswers[];
  materialParent: string;
  section: string;
  level: number;
}

export const useInquiryQuestion = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<QuizResponse>) => void;
  onError?: (error: any) => void;
}) => {
  const { session } = useSession();

  return useMutation({
    mutationFn: async (request: QuizRequest) => {
      if (!session?.token) {
        throw new Error("No token available");
      }
      return api.post<any, ApiResponse<QuizResponse>>("/quiz/inquiry", request, {
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

export const useSubmitQuiz = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<SubmitQuizRequest>) => void;
  onError?: (error: any) => void;
}) => {
  const { session } = useSession();

  return useMutation({
    mutationFn: async (payload: SubmitQuizRequest) => {
      if (!session?.token) {
        throw new Error("No token available");
      }

      return api.post<any, ApiResponse<SubmitQuizRequest>>("/quiz/submit", payload, {
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
