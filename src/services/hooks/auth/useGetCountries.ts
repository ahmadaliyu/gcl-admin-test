import { get } from '@/services/apiServices';
import { useQuery } from '@tanstack/react-query';
import { CountryResponse } from './types';

export const useGetCountries = (onSuccess?: (data: any) => void) => {
  return useQuery<CountryResponse, Error>({
    queryKey: ['countries'],
    refetchInterval: 5000,
    queryFn: async (): Promise<CountryResponse> => {
      const response: CountryResponse = await get('auth/countries');

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
