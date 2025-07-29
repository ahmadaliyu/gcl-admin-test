import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { ServiceResponse } from "./types";

export const useGetServices = (onSuccess?: (data: any) => void) => {
  return useQuery<ServiceResponse, Error>({
    queryKey: ["services"],

    queryFn: async (): Promise<ServiceResponse> => {
      const response: ServiceResponse = await get(`admin/services`);

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
