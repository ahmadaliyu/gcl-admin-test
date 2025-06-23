import { post } from "@/services";
import { useMutation } from "@tanstack/react-query";

type MutationProps = {
  labelId: string;
};

// When everything is approved
export const useCreateLabel = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: ({ labelId }: MutationProps) => {
      return post(`admin/bookings/${labelId}/labels`);
    },

    onSuccess: async (response: any) => {
      //   const message = response?.message;
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
