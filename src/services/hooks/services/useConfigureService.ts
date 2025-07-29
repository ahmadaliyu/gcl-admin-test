import { post } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { FullServicePayload } from "./types";

type MutationProps = {
  serviceId: string;
  payload: FullServicePayload;
};

export const useConfigureService = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: ({ serviceId, payload }: MutationProps) => {
      return post(`admin/services/${serviceId}/legs`, payload);
    },

    onSuccess: async (response: any) => {
      if (onSuccess) {
        onSuccess(response);
      }
    },
    onError: (error) => {
      console.error("Error hmm", error);
    },
  });

  return { mutate, isPending, data, error };
};
