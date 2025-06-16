import { Delete } from '@/services/apiServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteAddress = (onSuccess?: (data: any) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cityId: string) => {
      return Delete(`users/addresses/${cityId}`);
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
      console.error('Deletion error:', error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
};
