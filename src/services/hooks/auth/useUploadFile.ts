import { postFile } from "@/services/apiServices";
import { useMutation } from "@tanstack/react-query";

// Payload type
type MutationProps = {
  payload: FormData;
};

// File upload response type
interface FileUploadResponse {
  success: boolean;
  data: {
    fileName: string;
    filePath: string;
  };
}

export const useUploadFile = (
  onSuccess?: (data: FileUploadResponse) => void
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: ({ payload }: MutationProps) => {
      return postFile("auth/image/upload", payload); // use postFile here
    },

    onSuccess: (response) => {
      if (onSuccess) {
        onSuccess(response.data);
      }
    },
    onError: (error) => {
      console.error("File upload failed:", error);
      alert(`Error!! ${error.message}`);
    },
  });

  return { mutate, isPending };
};
