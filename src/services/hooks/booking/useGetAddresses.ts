import { get } from '@/services/apiServices';
import { useQuery } from '@tanstack/react-query';
import { AddressResponse } from './types';

export const useGetAddresses = (onSuccess?: (data: any) => void) => {
  return useQuery<AddressResponse, Error>({
    queryKey: ['addresses'],
    refetchInterval: 2000,
    queryFn: async (): Promise<AddressResponse> => {
      const response: AddressResponse = await get('users/addresses');

      if (response.success === false) {
        throw new Error('Failed to fetch');
      }

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response;
    },
  });
};
