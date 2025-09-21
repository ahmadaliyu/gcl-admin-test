import { patch } from "@/services/apiServices";
import { useMutation } from "@tanstack/react-query";

interface UpdateStatusPayload {
  status: "approved" | "processing" | "rejected";
  data?: {
    fileName: string;
    filePath: string;
  };
}

export const useUpdateCustomClearanceStatus = (
  onSuccess?: (data: any) => void
) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateCustomClearanceStatus"],
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateStatusPayload;
    }) => {
      return patch(`admin/custom-clearance/${id}`, payload);
    },
    onSuccess: async (response: any) => {
      if (response.success === false) {
        throw new Error(response?.message);
      } else {
        if (onSuccess) {
          onSuccess(response);
        }
      }
    },
  });

  return { mutate, isPending };
};
