import { patch, post } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { AddressFormData } from './types';

type MutationProps = {
  id: string;
  payload: AddressFormData;
};

export const useUpdateAddress = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, payload }: MutationProps) => {
      return patch(`users/addresses/${id}`, payload);
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
      console.error(error, 'Error');
    },
  });

  return { mutate, isPending };
};
