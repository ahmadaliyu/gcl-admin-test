import { post } from "@/services";
import { useMutation } from "@tanstack/react-query";

interface Item {
  id: string;
  quantity: number;
  weight: number;
  unit_weight: string;
}

interface ItemPayload {
  item: Item;
}

type MutationProps = {
  bookingId: string;
  payload: ItemPayload;
  approve?: boolean; // Optional flag
};

export const useValidateException = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ bookingId, payload, approve }: MutationProps) => {
      const url = `admin/bookings/${bookingId}/validate${
        approve ? "?approve=true" : ""
      }`;
      return post(url, payload);
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
