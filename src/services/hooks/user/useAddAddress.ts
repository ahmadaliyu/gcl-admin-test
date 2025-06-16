import { post } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { AddressFormData } from './types';

type MutationProps = {
  payload: AddressFormData;
};

export const useAddAddress = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProps) => {
      return post('users/addresses', payload);
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
