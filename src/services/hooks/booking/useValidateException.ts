import { post } from "@/services";
import { useMutation } from "@tanstack/react-query";

interface Item {
  id: string;
  quantity: number;
  weight: number;
  unit_weight: number;
}

interface ItemPayload {
  item: Item;
}

type MutationProps = {
  bookingId: string;
  payload: ItemPayload;
};

export const useValidateException = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ bookingId, payload }: MutationProps) => {
      return post(`admin/bookings/${bookingId}/validate`, payload);
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
