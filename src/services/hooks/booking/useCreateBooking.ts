import { post } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { ShipmentPayload } from './types';

type MutationProps = {
  payload: ShipmentPayload;
};

export const useCreateBooking = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProps) => {
      return post('users/bookings', payload);
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
