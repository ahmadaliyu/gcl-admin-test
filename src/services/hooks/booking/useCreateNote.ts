import { post } from "@/services";
import { useMutation } from "@tanstack/react-query";

type MutationProps = {
  id: string;
  note: string;
};

export const useCreateNote = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: ({ id, note }: MutationProps) => {
      return post(`admin/bookings/${id}/notes`, { note });
    },

    onSuccess: async (response: any) => {
      if (response.success === false) {
        // throw new Error(message);
        throw new Error("Error message");
      } else {
        if (onSuccess) {
          onSuccess(response);
        }
      }
    },
    onError: (error) => {
      console.error("Error", error);
    },
  });

  return { mutate, isPending, data, error };
};
