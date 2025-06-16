import { get } from '@/services/apiServices';
import { useQuery } from '@tanstack/react-query';
import { CityResponse } from './types';

export const useGetCities = (onSuccess?: (data: any) => void) => {
  return useQuery<CityResponse, Error>({
    queryKey: ['cities'],
    refetchInterval: 5000,

    queryFn: async (): Promise<CityResponse> => {
      const response: CityResponse = await get('auth/cities');

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
