import { post } from '@/services/apiServices';
import { useMutation } from '@tanstack/react-query';
import { QuotesResponse } from './types';

type MutationProps = {
  payload: {
    shipment: {
      ship_from: {
        name?: string;
        postcode: string;
        country_iso: string;
      };
      ship_to: {
        name?: string;
        postcode: string;
        country_iso: string;
      };
      parcels: {
        description: string;
        items: {
          description: string;
          sku?: string;
          quantity: number;
          weight: number;
          unit_weight: string;
          weight_unit: string;
          hs_code?: string;
        }[];
      }[];
      despatch_date: string;
    };
  };
};

export const useGetQuotes = (onSuccess?: (data: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProps) => {
      return post('auth/quotes', payload);
    },
    onSuccess: async (response: QuotesResponse) => {
      if (response.success === false) {
        throw new Error('Error');
      } else {
        if (onSuccess) {
          onSuccess(response);
        }
      }
    },
  });
  return { mutate, isPending };
};
