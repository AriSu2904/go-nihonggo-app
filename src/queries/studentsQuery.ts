import { useSession } from "@/contexts/auth.context";
import { api } from "@/lib/api";
import { ApiResponse } from "@/types/ApiResponse";
import { useMutation } from "@tanstack/react-query";

export interface ProfilePictureResponse {
  id: string;
  filename: string;
  url: string;
}

export interface StudentProgressResponse {
  highestScore: number;
  id: string;
  materialParent: string;
  quizId: string;
  quizLevel: number;
  totalAttempt: number;
  userId: string;
  inquiryUsed: boolean;
  currentScore: number;
  section: string;
}

export interface StudentResponse {
  fullName: string;
  studentId: string;
  campus: string;
  major: string;
  status: string;
  gender: string;
  level: string;
  joinDate: string;
  profilePicture: ProfilePictureResponse;
}

export class ImageFile extends Blob {
  uri: string;

  constructor(uri: string) {
    super();
    this.uri = uri;
  }
}

export const useStudentProfile = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<StudentResponse>) => void;
  onError?: (error: any) => void;
}) => {
  const { session } = useSession();

  return useMutation({
    mutationFn: async () => {
      if (!session?.token) {
        throw new Error("No token available");
      }

      return api.get<any, ApiResponse<StudentResponse>>("/users/me", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
    },
    onSuccess: (data) => {
      if (data) {
        onSuccess && onSuccess(data);
      }
    },
    onError: (error) => {
      onError && onError(error);
    },
  });
};

export const useStudentProfilePicture = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<StudentResponse>) => void;
  onError?: (error: any) => void;
}) => {
  const { session } = useSession();

  return useMutation({
    mutationFn: async (profilePicture: string) => {
      if (!session?.token) {
        throw new Error("No token available");
      }

      const formData = new FormData();

      formData.append('image', {
        uri: profilePicture,
        name: 'profile-picture.jpg',
        type: 'image/jpeg',
      } as any);

      return api.post<any, ApiResponse<StudentResponse>>(
        "/users/profile-pictures",
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        }
      );
    },
    onSuccess: (data) => {
      if (data) {
        onSuccess && onSuccess(data);
      }
    },
    onError: (error) => {
      onError && onError(error);
    },
  });
};

export const useStudentProgressTracker = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: ApiResponse<StudentProgressResponse>) => void;
  onError?: (error: any) => void;
}) => {
  const { session } = useSession();

  return useMutation({
    mutationFn: async () => {
      if (!session?.token) {
        throw new Error("No token available");
      }

      return api.get<any, ApiResponse<StudentProgressResponse>>("/quiz/trackers", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }).catch(error => {
        console.error("Error occurred:", error);
        throw error;
      });
    },
    onSuccess: (data) => {
      if (data) {
        onSuccess && onSuccess(data);
      }
    },
    onError: (error) => {
      onError && onError(error);
    },
  });
};