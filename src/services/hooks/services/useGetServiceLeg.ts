import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { ServiceLegResponse } from "./types";

export const useGetServiceLeg = (onSuccess?: (data: any) => void) => {
  return useQuery<ServiceLegResponse, Error>({
    queryKey: ["serviceLegs"],

    queryFn: async (): Promise<ServiceLegResponse> => {
      const response: ServiceLegResponse = await get(`admin/service-legs`);

      if (response.success === false) {
        throw new Error("Failed to fetch");
      }

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    },
  });
};
