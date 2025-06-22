import { post } from "@/services";
import { useMutation } from "@tanstack/react-query";

type MutationProps = {
  bookingId: string;
};

// When everything is approved
export const useCreateLabel = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ bookingId }: MutationProps) => {
      return post(`admin/bookings/${bookingId}/labels`);
    },

    onSuccess: async (response: any) => {
      const message = response?.message;
      if (response.success === false) {
        throw new Error(message);
      } else {
        if (onSuccess) {
          onSuccess(response);
        }
      }
    },
  });

  return { mutate, isPending };
};
