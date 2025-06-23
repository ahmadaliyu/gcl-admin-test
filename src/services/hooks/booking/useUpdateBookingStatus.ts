import { patch } from "@/services";
import { useMutation } from "@tanstack/react-query";

type MutationProps = {
  id: string;
  payload: {
    status: string;
    comment: string;
  };
};

export const useUpdateBookingStatus = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, payload }: MutationProps) => {
      return patch(`admin/bookings/${id}`, payload);
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
    onError: (error: Error) => {
      console.error(error, "Error");
    },
  });

  return { mutate, isPending };
};
