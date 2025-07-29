import { post } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { CreateCourierPayload } from "./types";
import { useAlert } from "@/components/reuseables/Alert/alert-context";

type MutationProps = {
  payload: CreateCourierPayload;
};

export const useCreateCourier = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: ({ payload }: MutationProps) => {
      return post(`admin/couriers`, payload);
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
