import { post } from "@/services";
import { useMutation } from "@tanstack/react-query";

type MutationProps = {
  bookingId: string;
  payload: { message: string; amount: number };
};

export const useTriggerAdditionalPayment = (
  onSuccess?: (data: any) => void
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ bookingId, payload }: MutationProps) => {
      return post(
        `admin/bookings/${bookingId}/exception/trigger-payment`,
        payload
      );
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
