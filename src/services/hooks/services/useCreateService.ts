import { post } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { ServicesResponse } from "./types";

type MutationProps = {
  payload: ServicesResponse;
};

export const useCreateService = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: ({ payload }: MutationProps) => {
      return post(`admin/services`, payload);
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
