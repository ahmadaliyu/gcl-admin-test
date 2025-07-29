import { get } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import { CouriersResponse } from "./types";

export const useGetCouriers = (onSuccess?: (data: any) => void) => {
  return useQuery<CouriersResponse, Error>({
    queryKey: ["couriers"],

    queryFn: async (): Promise<CouriersResponse> => {
      const response: CouriersResponse = await get(`admin/couriers`);

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
